FROM node:18.12-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --production

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
