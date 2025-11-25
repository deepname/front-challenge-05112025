# syntax=docker/dockerfile:1
FROM node:20-alpine AS base

WORKDIR /app

ENV NODE_ENV=development

COPY package.json package-lock.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["sh", "-c", "npx nuxi prepare && npm run dev"]
