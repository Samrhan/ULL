FROM node:14-alpine as build

WORKDIR /app
COPY ./dist/apps/authentication /app
COPY storage-service-account.json .

RUN npm install
RUN npm i pg

CMD node main.js