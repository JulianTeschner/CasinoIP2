FROM mongo:4.2.8

WORKDIR ./ 

ENV MONGO_INITDB_ROOT_USERNAME=root
ENV MONGO_INITDB_ROOT_PASSWORD=password
ENV MONGO_INITDB_DATABASE=root-db

COPY docker-entrypoint-initdb.d/mongo-init.js /docker-entrypoint-initdb.d/

EXPOSE 27017

# services:
#   mongo:
#     container_name: container-mongodb
#     image: mongo:latest
#     ports:
#       - 27017:27017
#     environment:
#       MONGO_INITDB_ROOT_USERNAME: root
#       MONGO_INITDB_ROOT_PASSWORD: password
#       MONGO_INITDB_DATABASE: root-db
#     volumes:
#       - ./docker-entrypoint-initdb.d/mongo-init.js:/docker-entrypoint-initdb.d/mongo-init.js:ro
