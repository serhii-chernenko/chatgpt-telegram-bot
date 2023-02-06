const { Telegraf } = require('telegraf');
const { SessionManager } = require('@puregram/session');
const { message } = require('telegraf/filters');
const { join } = require('path');
const { Configuration, OpenAIApi } = require('openai');

require('dotenv').config({
    path: join(__dirname, '..', 'env', '.env')
});

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
const createDialogs = (ctx, next) => {
    if (!ctx?.session?.dialogs) {
        ctx.session.dialogs = new Map();
    }

    return next();
};

const checkAccess = (ctx, next) => {
    if (ctx.session.isAllowed) {
        return next();
    }

    const allowedUsers = process.env.ALLOWED_USERS.split(/\s+/);
    const isAllowed = allowedUsers.includes(ctx.message.from.username);

    ctx.session.isAllowed = isAllowed;

    return isAllowed ? next() : ctx.sendMessage('Access denied!');
};

if (process.env.NODE_ENV === 'dev') {
    bot.use(Telegraf.log());
}

const sessionManager = new SessionManager();

bot.use(sessionManager.middleware);
bot.use(createDialogs);
bot.use(checkAccess);

bot.start(async ctx => {
    ctx.session.dialogs.set(ctx.chat.id, []);

    await ctx.sendMessage('Hello there!');
});

bot.command('reset', async ctx => {
    ctx.session.dialogs.set(ctx.chat.id, []);

    await ctx.sendMessage('Chat has been reset!');
});

bot.on(message('text'), async ctx => {
    let typing = setInterval(async () => {
        await ctx.sendChatAction('typing');
    }, 1000);

    try {
        const chatId = ctx.chat.id;
        const isTest = ctx.message.text.length < 5;

        if (!ctx.session.dialogs.has(chatId)) {
            ctx.session.dialogs.set(chatId, []);
        }

        const dialog = ctx.session.dialogs.get(chatId);

        if (!isTest) {
            dialog.push(ctx.message.text);
        }

        const response = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt: isTest ? 'Say this is a test' : dialog.join('\n'),
            max_tokens: 2048
        });
        const answer = response.data.choices[0].text;

        clearInterval(typing);
        await ctx.replyWithMarkdown(response.data.choices[0].text);

        ctx.session.dialogs.delete(chatId);
        ctx.session.dialogs.set(chatId, dialog);
    } catch (error) {
        clearInterval(typing);
        await ctx.sendMessage(
            error.response ? error.response.statusText : error.message
        );
    }
});

bot.catch(error => console.error(error));

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
