FROM node:18.12-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install cors dotenv express typescript ts-node @types/dotenv @types/cors @types/express @types/node

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
