# ChatGPT
Telegram bot based on ChatGPT API<br/>
Телеграм бот на базі API від ChatGPT<br/>

Example:<br/>
Приклад:<br/>
https://t.me/ixGPTbot
<hr/>

## Prepare to use<br/>Підготуй для використання

### ChatGPT

Make sure that you have a created account in OpenAI service:<br/>
Переконайся, що в тебе є зареєстрований акаунт в OpenAI сервісі:<br/>
https://openai.com/

**For Ukrainians / Для українців на території України:**<br>
Станом на лютий місяць 2023 року створити акаунт в OpenAI можливо тільки на закордоний номер та під VPN.<br/>
Я створював наступним чином:
1. Попросив в друга з Польщі номер телефону.
2. Якщо ж у тебе не має, в кого попросити номер, загугли сервіси, в яких можна придбати тимчасовий номер. Це коштує приблизно $1-6. Але перш ніж купляти перший ліпший, переконайся, що він підходить для реєстрації в [OpenAI](https://openai.com/), бо багато віртуальних номерів вже використанні з такою ж метою і можуть вже бути зареєстровані у сервісі. 
2. Купив місячну підписку в [ProtonVPN](https://protonvpn.com/). Приблизно $12.
3. Зареєструвався з підтвердженням коду на номер телефону друга.
4. Після реєстрації вже ні номер, ні VPN не будуть потрібні, навіть якщо користуватися напряму в самому сервісі:<br/>https://chat.openai.com/
5. Тому я запросив повернення грошей в ProtonVPN. Для цього треба понизити твій тариф до безкоштовного а потім створити тікет в сапорті. Тобі на пошті будуть пропонувати усілякі дисконти, лише б ти залишився(-лася), але ігноруй та пиши, що потрібні саме гроші.
6. Після цього можеш рухатися далі по інструкції.

Create a new API key there:<br/>
Створи новий API ключ:<br/>
https://platform.openai.com/account/api-keys

### Docker<br/>Докер

There's only one thing that you need in your OS is Docker.<br/>
Єдине, що тобі потрібно встановити до ОС - це Docker.

Open the link below and follow instructions:<br/>
Відкрий посилання та слідуй інструкціям:
https://docs.docker.com/get-docker/

## How to run<br/>Як запустити

### Clone current repo<br/>Клонувати поточну репу

Run the command in your terminal.<br/>
Виконай команду в терміналі.

```shell
cd /path/to/directory/with/projects
git clone git@github.com:Inevix/chatgpt-telegram-bot.git
cd $_
```

### Create your own bot in Telegram<br>Створити власного бота в Телеграмі

Now you have to create a new bot to get an API bot token.<br/>
Зараз тобі потрібно буде створити нового бота, щоб отримати АПІ токен боту.

Open the chat:<br/>
Відкрий чат:<br/>
https://t.me/BotFather

Send the command message to the bot:<br/>
Відправ боту команду:
```shell
/newbot
```

And follow instructions<br/>
Та слідуй інструкціям.

Also, at current step I recommend you to create second bot, 'cause you will have 2 environments:<br/>
Також на цьому етапі я хотів би порадити тобі створити ще одного бота, бо в тебе буде 2 оточення:
   - `dev`
   - `production`

It includes different docker containers and different databases. In this case, better to have 2 different bots with different tokens to run them separately.<br/>
Я маю на увазі різні докер контейнери та бази даних. В цьому випадку краще мати 2-х різних ботів з різними токенами, щоб запускати їх окремо.

### Prepare .env file<br/>Підготуй .env файл

In the new `chatgpt-telegram-bot` directory you can find the directory `env` with the file `.env.example`.<br/>
В новій директорії `chatgpt-telegram-bot` ти можеш знайти ще одну директорію `env` з файлом `.env.example`.

First of all copy and rename this file to 2 different files such as: `.env.dev` and `.env.production`.<br/>
Для початку, зроби 2 копії цього файлу та перейменуй його в `.env.dev` та `.env.production`.

```shell
cp env/.env.example env/.env.dev
cp env/.env.example env/.env.production
```

### Set the OpenAI token<br/>Вказати токен OpenAI

Open both env files and set the tokens as values of the `OPENAI_API_KEY` variable.<br/>
Відкрий обидва env файли та вкажи отримані токени, як значення для змінної `OPENAI_API_KEY`.

```dotenv
OPENAI_API_KEY="xx-xxxxx..."
```

### Set the bot telegram token<br/>Вказати токен телеграм боту

Open both env files and set the tokens as values of the `TELEGRAM_BOT_TOKEN` variable.<br/>
Відкрий обидва env файли та вкажи отримані токени, як значення для змінної `TELEGRAM_BOT_TOKEN`.

```dotenv
TELEGRAM_BOT_TOKEN="xxxxx:xxxxx..."
```

Don't forget that better to use different bots with different tokens for `dev` and `production` modes.<br/>
Не забудь, що краще використовувати різних ботів з різними токенами для `dev` та `production` режимів.

### Set allowed users<br/>Вказати дозволених юзерів

Open both env files and set telegram usernames to the `ALLOWED_USERS` variable which allowed to use your bot.<br/>
Відкрий обидва env файли та вкажи телеграм юзернейми, яким ти хочеш дати доступ для користуванням ботом, як значення для змінної `ALLOWED_USERS`.

```dotenv
# Only one / Тільки один
ALLOWED_USERS="username"
# Some users / Для декількох юзерів
ALLOWED_USERS="username1 username2 username3..."
```

### Run docker containers in the developer mode<br/>Запусти докер контейнери в режимі розробника

```shell
npm run docker:dev
```

The command `docker:dev` and other you can find in the `package.json` file.<br/>
Команду `docker:dev` та інші ти можеш знайти у файлі `package.json`. 

### Run the bot in the production mode<br/>Запусти бота в продакшн режимі

When you run the bot in the developer mode you can't run docker containers in a background, and you see a lot of logs from telegram updates. You can prevent this. Feel free to run the bot in background mode without any logs of telegram updates by the command:<br/>
Коли ти запускаєш бота в режимі розробника, ти не можеш запустити докер контейнери у фоні, а також ти бачиш багато логів після кожного оновлення в чаті з ботом. Ти можеш цьому зарадити. Запустити бота у фоні без логів можна за допомогою команди: 
```shell
npm run docker:start
```

Additional commands:<br/>
Додаткові команди:
```shell
npm run docker:start
npm run docker:stop
npm run docker:restart
```

## Time to make changes<br/>Час вносити зміни

### Editing<br/>Редагування

Run the bot in the developer mode:<br/>
Запусти бот в режимі розробника:
```shell
npm run docker:dev
```

Next feel free to edit any files in the `bot` directory.<br/>
Далі зміни будь який файл в директорії `bot`.

### Local NPM packages<br/>Локальні NPM пакети

Before go next steps, you have to install NPM packages to your local machine too.<br/>
Перед тим, як рухатися далі, ти маєш встановити NPM пакети локально також.

If you don't have Node.js locally, please visit the [site](https://nodejs.org/en/).<br/>
Якщо в тебе немає Node.js локально, відвідай цей [сайт](https://nodejs.org/uk/).

Next just install NPM packages to the project directory.<br/>
Далі просто встанови NPM пакети в директорію проєкту.
```shell
npm i
```

### Code inspecting<br/>Перевірка коду

There is the `.eslintrc.js` file in the project to present rules for [ESLint](https://eslint.org/).<br/>
В проєкті є `.eslintrc.js` файл з правилами для [ESLint](https://eslint.org/).

Configure your code editor to follow rules:<br/>
Налаштуй свій редактор коду під вказані правила:
   - [VSCode](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
   - [PHPStorm](https://www.jetbrains.com/help/phpstorm/eslint.html)

### Code formatting<br/>Форматування коду

There is the `.prettierrc.js` file in the project to preset rules for [Prettier](https://prettier.io/).<br/>
В проєкті є `.prettierrc.js` файл з правилами для [Prettier](https://prettier.io/).

Configure your code editor to follow rules:<br/>
Налаштуй свій редактор коду під вказані правила:
   - [VSCode](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
   - PHPStorm:
     - [Plugin / Плагін](https://plugins.jetbrains.com/plugin/10456-prettier)
     - [Configuration / Налаштування](https://www.jetbrains.com/help/phpstorm/prettier.html)

## Contributing<br/>Долучитися до проєкту

I'm really excited if you are interested in the improving of my project. Thanks so much!<br/>
Я дійсно в захваті, що ти зацікавився покращенням мого проєкту. Дуже тобі вдячний!

There are some steps how you can do that:<br/>
Тут декілька кроків, що потрібно зробини для цього:
1. Fork my repository.<br/>Зроби форк мого репозиторію.
2. Deploy the project locally (follow instructions above).<br/>Розгорни проєкт локально, слідуючи інструкціям вище.
3. Make your changes.<br/>Внеси свої зміни.
4. Make sure that your changes have been self-checked by you.<br/>Обовʼязково перевір свої зміни власноруч.
5. Make sure that you followed rules of ESLint and Prettier. I can't merge your changes if you'll ignore this point.<br/>Переконайся, що в тебе налаштовані ESLint та Prettier. Без них я не прийму твій код.
6. Create a new PR (Pull Request) from your repo to mine.<br/>Зроби новий ПР (запит на внесення коду) з твоєї репи до моєї.
7. Wait while I'll check that.<br/>Очікуй, поки я не перевірю.
8. If I don't agree with your changes, be absolutely sure that I'll write a comment why I think so.<br/>Якщо я не згодний зі змінами, будь певний, я обовʼязково відпишу чому.
9. If I want to see your changes in the project:<br/>Якщо мені подобаються твої зміни:
   - I'll merge the PR if everything is fine.<br/>Я внесу їх, якщо все добре.
   - I'll ask you to do some fixes if something will be wrong.<br/>Я попрошу тебе зробити певні правки, якщо щось буде не так.