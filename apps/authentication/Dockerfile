FROM node:14-alpine as build

WORKDIR /app
COPY ./dist/apps/authentication /app

RUN npm install
CMD node main.js