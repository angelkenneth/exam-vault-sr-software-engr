# Ref: https://v2.vuejs.org/v2/cookbook/dockerize-vuejs-app.html

# build stage
FROM node:18.19.1-alpine as build-stage
WORKDIR /app
COPY ./package.json ./pnpm-lock.yaml* ./
RUN corepack enable pnpm
RUN corepack use pnpm@latest-8
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
