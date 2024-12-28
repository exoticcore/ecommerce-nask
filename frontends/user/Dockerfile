FROM node:20-alpine as builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine as runner
WORKDIR /app
COPY --from=builder /app/package.json .
COPY --from=builder /app/package-lock.json .
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/src ./src
COPY --from=builder /app .

# COPY --from=builder /app/.next/standalone ./
# COPY --from=builder /app/.next/static ./.next/static
EXPOSE 10000
ENTRYPOINT ["npm", "start"]