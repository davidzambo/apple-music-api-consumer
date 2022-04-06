# ⚒ Build the builder image
FROM node:16-alpine as builder

# 👇 Create working directory
WORKDIR /app

COPY package*.json tsconfig.json ./

COPY public ./public
COPY src ./src
RUN npm ci
RUN npm run build

FROM nginx:1.16.0-alpine
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
