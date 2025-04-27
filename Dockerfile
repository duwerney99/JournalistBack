FROM node:18-slim

WORKDIR /src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8081

CMD [ "npm", "start" ] 
