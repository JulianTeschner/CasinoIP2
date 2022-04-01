package persistence

import (
	"context"
	"log"
	"time"

	"github.com/JulianTeschner/CasinoIP2/models"
	"go.mongodb.org/mongo-driver/bson"
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
}

// GetCollection returns a specific collection reference from a database specified by the name.
func GetCollection(client *mongo.Client, database string, collection string) *mongo.Collection {

	return client.Database(database).Collection(collection)
}

// Disconnect closes the connection to the database.
func Disconnect(client *mongo.Client) error {
	return client.Disconnect(ctx)
}

func GetValue(client *mongo.Client,
	database string,
	collection string,
	key string,
	value string) models.User {
	coll := GetCollection(client, database, collection)
	var user models.User
	err := coll.FindOne(ctx, bson.M{key: value}).Decode(&user)
	if err != nil {
		log.Fatal(err)
	}
	return user
}
