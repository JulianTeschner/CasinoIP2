package main

import (
	"context"
	"fmt"
	"time"

	"custom.com/models"
	"custom.com/persistence"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

var ctx context.Context

func init() {
	ctx, _ = context.WithTimeout(context.Background(), 10*time.Second)
}

func main() {
	client := persistence.CreateDbConnection()
	// fmt.Println(connection)

	defer persistence.Disconnect(client)

	usersCollection := persistence.GetCollection(client, "api_test_db", "users")

	cursor, err := usersCollection.Find(ctx, bson.M{"last_name": "Doe"})
	// id, _ := primitive.ObjectIDFromHex("62455d5f8ff40d087123167c")
	// cursor, err := usersCollection.Find(ctx, bson.M{"_id": id})
	if err != nil {
		panic(err)
	}

	var users []models.User
	if err := cursor.All(ctx, &users); err != nil {
		panic(err)
	}

	fmt.Println(users)

	user := users[0]
	user.LastName = "Not"
	user.ID = primitive.NewObjectID()
	usersCollection.InsertOne(ctx, &user)

}
