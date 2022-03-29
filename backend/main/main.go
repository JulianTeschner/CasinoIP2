package main

import (
	"fmt"

	"custom.com/persistence"
)

func main() {
	client := persistence.CreateDbConnection()
	// fmt.Println(connection)

	defer persistence.Disconnect(client)
	dbs := persistence.GetDatabases(client)

	// coll := persistence.GetCollection(connection, "api_prod_db", "users")

	fmt.Printf("%T", dbs)
}
