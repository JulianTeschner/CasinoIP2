FROM node:18-buster-slim as build

WORKDIR /app

COPY package.json /app

COPY package-lock.json /app

RUN npm install --force

COPY . /app

RUN npm run build

FROM node:18-buster-slim

COPY --from=build /app/build /build

CMD ["npx", "serve", "-s", "build"]