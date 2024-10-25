FROM node:20-bookworm-slim as build
ENV TZ=Europe/Berlin
EXPOSE 80
EXPOSE 443

RUN npm i -g pnpm

WORKDIR /app


COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./


COPY src/packages src/packages
COPY src/apps/frontend src/apps/frontend

RUN pnpm i

RUN pnpm run build:packages
RUN pnpm --filter @apps/frontend run build


FROM nginx:alpine

COPY --from=build /app/src/apps/frontend/dist/browser /usr/share/nginx/html
COPY src/apps/frontend/nginx.conf /etc/nginx/conf.d/default.conf
