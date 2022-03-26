FROM mongo

COPY init.json /init.json
CMD mongoimport --host mongodb --db casino --collection balance --type json --file /init.json --jsonArray
