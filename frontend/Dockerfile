FROM node:21-bookworm-slim

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .