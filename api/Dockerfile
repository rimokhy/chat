FROM node:8.11.3-alpine

COPY . /app

WORKDIR /app

RUN npm install

RUN npm run build


CMD npm run prod

