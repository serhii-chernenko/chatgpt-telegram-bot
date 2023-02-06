FROM node:latest

RUN mkdir -p /chatgpt/bot
WORKDIR /chatgpt

COPY ./package.json ./
COPY ./bot ./bot/

RUN npm i --omit=dev

CMD ["npm", "start"]