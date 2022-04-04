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

func NewClient() (*mongo.Client, error) {
	client, err := mongo.NewClient(options.Client().ApplyURI("mongodb://root:password@localhost:27017/?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"))
	if err != nil {
		log.Fatal(err)
		// return client, err
	}
	return client, nil
}

// GetUser returns a user from the database. If the user does not exist, it returns an empty user.
func GetUser(client *mongo.Client,
	database string,
	collection string,
	key string,
	value string) models.User {

	var user models.User
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)

	err := client.Database(database).Collection(collection).FindOne(ctx, bson.M{key: value}).Decode(&user)
	if err != nil {
		log.Println("User not found: ", err)
	}
	return user
}

// DeleteUser deletes a user from the database.
func DeleteUser(client *mongo.Client,
	database string,
	collection string,
	key string,
	value string) (*mongo.DeleteResult, error) {

	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)

	result, err := client.Database(database).Collection(collection).DeleteOne(ctx, bson.M{key: value})
	if err != nil {
		log.Println("Deletion failed: ", err)
	}
	return result, err
}
