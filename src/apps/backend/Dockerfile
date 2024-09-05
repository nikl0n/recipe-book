FROM node:20 as build-backend
WORKDIR /app/backend
 
COPY ./ ./
 
RUN npm install
RUN npm run build
 
FROM node:20
WORKDIR /app/backend
 
COPY --from=build-backend /app/backend/dist /app/backend/dist
COPY ./package.json ./
 
RUN npm install --only=production
 
EXPOSE 3000
 
CMD ["node", "dist/main.js"]