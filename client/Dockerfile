# build environment
FROM node:10.16-alpine as build

WORKDIR /www/client

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# production environment
FROM nginx:1.16-alpine
COPY --from=build /www/client/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

