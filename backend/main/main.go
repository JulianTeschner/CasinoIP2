package main

import (
	"fmt"

	"../persistence"
	_ "go.mongodb.org/mongo-driver/mongo"
	_ "go.mongodb.org/mongo-driver/mongo/options"
)

func main() {
	connection := persistence.CreateDbConnection()
	fmt.Println(connection)
}
