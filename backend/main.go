package main

import (
	"context"
	"fmt"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func main() {

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

	/*
	   List databases
	*/
	databases, err := client.ListDatabaseNames(ctx, bson.M{})
	if err != nil {
		log.Fatal(err)
	}

	db := client.Database("casino")
	collection := db.Collection("balance")

	/* user := bson.D{{"id", 3}, {"name", "jj"}, {"balance", 333}}
	result, err := collection.InsertOne(context.TODO(), user)
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println(result) */

	results, _ := collection.Find(context.TODO(), bson.D{})
	fmt.Println(results)
}
