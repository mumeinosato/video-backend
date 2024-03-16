FROM node:18.12 as build

WORKDIR /work

COPY package*.json ./
RUN npm install --production

COPY src tsconfig.json ./

RUN npm run build

FROM node:18.12 as runner

WORKDIR /work
EXPOSE 3000

COPY package*.json ./
RUN npm install --production && npm cache clean --force

COPY --from=builder /dist ./dist

CMD ["node", "./dist/index.js"]
