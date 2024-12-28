FROM node:20-alpine AS builder

WORKDIR /app

COPY . .

RUN yarn install && yarn build

# Production
FROM node:20-alpine AS server

WORKDIR /app 

COPY --from=builder ./app/dist ./dist
COPY --from=builder ./app/proto ./proto
COPY package.json .
COPY yarn.lock .
COPY swagger.yaml .

RUN yarn --production

EXPOSE 3000
EXPOSE 50051

CMD ["yarn", "start"]