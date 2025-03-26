# Not Production Level, but good enough for the exam
# Ref: https://medium.com/@itsuki.enjoy/dockerize-a-next-js-app-4b03021e084d
FROM node:18.19.1-alpine AS base

WORKDIR /app
COPY ./package.json ./pnpm-lock.yaml* ./
RUN corepack enable pnpm
RUN corepack use pnpm@latest-8
RUN pnpm i --frozen-lockfile
COPY . .
EXPOSE 3002
ENV DOCKER_NETWORK=true
CMD npm run dev
