FROM node:latest

WORKDIR /usr/src/api

COPY . .
# copiou o carquivo    renomeou para
COPY ./.env.production /.env

RUN npm install --quiet --no-optional --no-fund --loglevel=error

RUN npm run build

CMD ["npm", "run", "start:prod"]