[![codecov](https://codecov.io/gh/JulianTeschner/CasinoIP2/branch/main/graph/badge.svg)](https://codecov.io/gh/JulianTeschner/CasinoIP2)

# CasinoIP2

## Setup Database

Zum Aufsetzen der Database muss Docker und Docker-compose installiert sein. (Unter Windows Docker Desktop).

1. Wechsel in das database directory
2. Starten der DB durch eingabe von: docker-compose up -d
3. Stoppen der DB durch eingabe von: docker-compose stop
4. Entfernen der DB durch eingabe von: docker-compose down

Ihr könnt zum Beispiel über MongoDB Compass auf die DB zugreifen über die URI:\
mongodb://root:password@localhost:27017/?authSource=admin&readPreference=primary&directConnection=true&ssl=false 


## Setup Backend

Um das Backend zu starten muss Go installiert sein (https://go.dev/dl/).

1. In das directory backend/cmd navigieren.
2. Starten durch das comand: go run main.go
3. Die Enpoints der Api befinden stehen im router.go file

## Frontend URL
https://casino-frontend1.herokuapp.com/
