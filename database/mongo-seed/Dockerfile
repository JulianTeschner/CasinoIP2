FROM mongo
 ARG DATABASE_URI
 ARG USERNAME
 ARG PASSWORD

 ENV DATABASE_URI ${DATABASE_URI}
 ENV USERNAME ${USERNAME}
 ENV PASSWORD ${PASSWORD}
 
COPY init.json /init.json

CMD mongoimport --username ${USERNAME} --password ${PASSWORD} --uri ${DATABASE_URI} --collection balance --drop --file --jsonArray /init.json
