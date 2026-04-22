FROM node:22-alpine AS builder

WORKDIR /usr/src/api

COPY package*.json ./

RUN npm install --quiet

COPY . .

RUN npm run build

FROM node:22-alpine AS deps

WORKDIR /usr/src/api

COPY package*.json ./

RUN npm install --quiet --only=production

FROM node:22-alpine AS runner

WORKDIR /usr/src/api

ENV NODE_ENV=production

COPY --from=deps /usr/src/api/node_modules ./node_modules
COPY --from=builder /usr/src/api/dist ./dist
COPY --from=builder /usr/src/api/package.json ./package.json

EXPOSE 8080

CMD ["npm", "run", "start:prod"]
