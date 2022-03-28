package persistence

import (
	"context"
	_ "fmt"
	"log"
	"time"

	_ "go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// CreateDbConnection creates a connection to the Database and return a Client if successful.
func CreateDbConnection() *mongo.Client {

	/*
	   Connect to my cluster
	*/
	client, err := mongo.NewClient(options.Client().ApplyURI("mongodb://root:rootpassword@localhost:27017/?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"))
	if err != nil {
		log.Fatal(err)
	}

	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	err = client.Connect(ctx)
	if err != nil {
		log.Fatal(err)
	}
	defer client.Disconnect(ctx)

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

func GetDatabases(client *mongo.Client) []string {
	/*
	   List databases
	*/
	databases, err := client.ListDatabaseNames(
		context.WithTimeout(
			context.Background(),
			10*time.Second),
	)
	if err != nil {
		log.Fatal(err)
	}
	return databases
}

func GetCollection(client *mongo.Client, database string, collection string) *mongo.Collection {

	db := client.Database(database)
	coll := db.Collection(collection)

	return coll
}
