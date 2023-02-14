FROM node:16-alpine as deployment

WORKDIR /app

RUN apk add g++ make py3-pip

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build


FROM node:16-alpine as production

WORKDIR /app

ENV NODE_ENV=development
ENV DB_PASSWORD='LeahAndAdam'
ENV PORT='8084'
ENV DB_HOST='mysql-docker-local'
ENV DB_USER='root'
ENV DB_NAME='test'

RUN apk add g++ make py3-pip

COPY package*.json .

RUN npm install --only=production

COPY --from=deployment /app/dist ./dist
COPY --from=deployment /app/keystore.p12 .

CMD ["node", "dist/app.js"]