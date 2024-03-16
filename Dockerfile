FROM node:18.12

WORKDIR /work

COPY package*.json ./
RUN npm install --production

COPY src tsconfig.json ./

RUN npm run build

COPY /dist ./dist

EXPOSE 3000

CMD ["node", "./dist/index.js"]
