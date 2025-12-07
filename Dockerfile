FROM node:24-alpine AS base

WORKDIR /app

COPY package*.json ./

RUN npm ci --legacy-peer-deps

COPY . .

RUN npx prisma generate

RUN npm run build

FROM node:24-alpine AS runtime

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev --legacy-peer-deps

COPY --from=base /app/dist ./dist
COPY --from=base /app/prisma ./prisma
COPY --from=base /app/node_modules/.prisma ./node_modules/.prisma

COPY --from=base /app/package.json ./package.json

ENV NODE_ENV=production

EXPOSE 4000

# CMD npm run prisma:migrate && npm run start:dev
CMD npx prisma migrate deploy && node dist/main.js
