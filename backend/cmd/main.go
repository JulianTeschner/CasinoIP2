package main

import (
	"context"
	"fmt"
	"log"
	"time"

	"github.com/JulianTeschner/CasinoIP2/models"
	"github.com/JulianTeschner/CasinoIP2/persistence"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

var ctx context.Context

func init() {
	ctx, _ = context.WithTimeout(context.Background(), 10*time.Second)
}

func main() {
	client, err := persistence.NewClient()
	if err != nil {
		log.Fatalln(err)

	}
	client.Connect(ctx)
	defer client.Disconnect(ctx)

    client.Database("api_test_db").Collection("users").InsertOne(ctx, 

	/* cursor, err := usersCollection.Find(ctx, bson.M{"last_name": "Doe"})
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
	usersCollection.InsertOne(ctx, &user) */

}
