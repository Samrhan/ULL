FROM node:14-alpine as build

WORKDIR /app
COPY ./dist/apps/authentication /app
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.7.3/wait /wait
RUN chmod +x /wait

RUN npm install
RUN npm i pg

CMD /wait && node main.js