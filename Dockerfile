FROM node:18.12-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --production

RUN npm install -g ts-node

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
