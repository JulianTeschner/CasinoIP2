# CasinoIP2

## Setup Database

Zum Aufsetzen der Database muss Docker und Docker-compose installiert sein. (Unter Windows Docker Desktop).

1. Wechsel in das database directory
2. Starten der DB durch eingabe von: docker-compose up -d
3. Stoppen der DB durch eingabe von: docker-compose stop
4. Entfernen der DB durch eingabe von: docker-compose down

Ihr könnt zum Beispiel über MongoDB Compass auf die DB zugreifen über die URI: //
mongodb://root:password@localhost:27017/?authSource=admin&readPreference=primary&directConnection=true&ssl=false 
