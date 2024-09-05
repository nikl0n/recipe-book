FROM node:20 as build-frontend
WORKDIR /app/frontend

COPY ./ ./

RUN npm install
RUN npm run build

FROM nginx:alpine

COPY --from=build-frontend /app/frontend/dist/frontend/browser /usr/share/nginx/html

EXPOSE 80
