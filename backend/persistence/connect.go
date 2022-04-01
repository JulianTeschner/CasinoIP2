package persistence

import (
	"context"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var ctx context.Context

func init() {
	ctx, _ = context.WithTimeout(context.Background(), 10*time.Second)
}

// CreateDbConnection creates a connection to the Database and return a Client if successful.
func CreateDbConnection() *mongo.Client {

	/*
	   Connect to my cluster
	*/
	client, err := mongo.NewClient(options.Client().ApplyURI("mongodb://root:password@localhost:27017/?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"))
	if err != nil {
		log.Fatal(err)
	}

	err = client.Connect(ctx)
	if err != nil {
		log.Fatal(err)
	}

	return client

	/* user := bson.D{{"id", 3}, {"name", "jj"}, {"balance", 333}}
	result, err := collection.InsertOne(context.TODO(), user)
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println(result) */

	/* results, _ := collection.Find(context.TODO(), bson.D{})
	fmt.Println(results, databases) */
}

/* // GetDatabase returns a list with all Database names.
func GetDatabases(client *mongo.Client) []string {

	databases, err := client.ListDatabaseNames(ctx, bson.M{})
	if err != nil {
		fmt.Println("here")
		log.Fatal(err)
	}

	return databases
} */

// GetCollection returns a specific collection reference from a database specified by the name.
func GetCollection(client *mongo.Client, database string, collection string) *mongo.Collection {

	db := client.Database(database)
	coll := db.Collection(collection)

	return coll
}

// Disconnect closes the connection to the database.
func Disconnect(client *mongo.Client) error {
	return client.Disconnect(ctx)
}
