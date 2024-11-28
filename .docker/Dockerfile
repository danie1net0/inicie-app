FROM node:lts-alpine

RUN apk add --no-cache bash

RUN npm i --location=global @angular/cli

USER node

WORKDIR /home/node/app

EXPOSE 4200
