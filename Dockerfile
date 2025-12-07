FROM node:24-alpine AS base

WORKDIR /app

COPY package*.json ./

RUN npm ci --legacy-peer-deps

COPY . .

RUN npx prisma generate

RUN npm run build

FROM node:24-alpine AS runtime

WORKDIR /app

COPY --from=base /app .

EXPOSE 4000

CMD npm run prisma:migrate && npm run start:dev
