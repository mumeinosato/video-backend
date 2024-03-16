FROM node:18.12

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --production

RUN npm run build

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
