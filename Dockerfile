FROM node:18.12

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --production

COPY . .

EXPOSE 3000

RUN npm run build

CMD ["npm", "start"]
