FROM node:18-buster-slim

WORKDIR /app

COPY . /app

RUN npm install --force

RUN npm run build

CMD ["npx", "serve", "-s", "build"]