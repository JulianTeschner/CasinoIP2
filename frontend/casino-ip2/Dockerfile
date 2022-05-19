FROM node:18-buster-slim as build

# copy project files
COPY ./ ./

# install dependencies
RUN npm install --force

# build frontend
RUN npm run build

# multistage build
FROM node:18-buster-slim as frontend

WORKDIR /app

# copy build files
COPY --from=build ./build ./app

# install serve 
RUN npm install serve

# serve frontend on port 80
CMD ["npx", "serve", "-s", "app", "-l", "80"]