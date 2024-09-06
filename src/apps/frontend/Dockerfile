FROM node:20 as build-frontend
WORKDIR /app/frontend

COPY ./ ./

RUN npm install
RUN npm run build

FROM nginx:alpine

COPY --from=build-frontend /app/frontend/dist/browser /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
