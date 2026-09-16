# Estágio de Build
FROM node:24 AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Estágio de Execução Nginx
FROM nginx:alpine
COPY --from=build /app/dist/frontend/browser /usr/share/nginx/html
EXPOSE 80
