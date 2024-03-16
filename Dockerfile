FROM node:18.12-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install cors dotenv express typescript @types/dotenv @types/cors @types/express @types/node
RUN npm install -g ts-node

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
