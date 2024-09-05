FROM node:20 as build-backend
WORKDIR /app/backend
 
COPY ./ ./
 
RUN npm install
RUN npx dotenv -e env/.env -c development -- npx prisma generate
RUN npm run build
 
FROM node:20
WORKDIR /app/backend
 
COPY --from=build-backend /app/backend/dist /app/backend/dist
COPY --from=build-backend /app/backend/node_modules /app/backend/node_modules
COPY ./package.json ./
 
RUN npm install --only=production
 
EXPOSE 3000
 
CMD ["npm", "run", "prod"]