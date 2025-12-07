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
# COPY --from=base /app/node_modules ./node_modules
# COPY --from=runtime /app/dist ./dist

EXPOSE 4000

CMD npx prisma generate && npx prisma migrate dev --name init && npm run start:dev
# CMD ["node", "dist/src/main"]
