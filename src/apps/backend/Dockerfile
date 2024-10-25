FROM node:20-bookworm-slim as build
EXPOSE 3000
ENV TZ=Europe/Berlin

# prisma:warn Prisma failed to detect the libssl/openssl version to use, and may not work as expected. Defaulting to "openssl-1.1.x".
# Please manually install OpenSSL via `apt-get update -y && apt-get install -y openssl` and try installing Prisma again.
# If you're running Prisma on Docker, add this command to your Dockerfile
RUN apt-get update -y && apt-get install -y openssl

RUN npm i -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

COPY src/packages src/packages
COPY src/apps/backend src/apps/backend

RUN pnpm i

RUN pnpm run build:packages
RUN pnpm --filter @apps/backend run prisma:generate
RUN pnpm --filter @apps/backend run build

WORKDIR /app/src/apps/backend

CMD ["npm", "run", "prod"]