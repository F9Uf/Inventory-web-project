FROM node:10.16-alpine

WORKDIR /www/server

ADD package.json /www/server
RUN npm install

ADD . /www/server

EXPOSE 5000

CMD ["npm", "start"]