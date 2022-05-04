package user

import (
	"context"
	"log"
	"os"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var Client *mongo.Client

func NewClient() {
	// var err error
	// Client, err = mongo.NewClient(options.Client().ApplyURI(os.Getenv("MONGO_URI")))
	// ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	// if err != nil {
	// 	log.Fatalf("Client wasn't created: %s", err)
	// 	// return client, err
	// }
	// Client.Connect(ctx)
	var err error
	log.Printf("Connecting to mongo at %s", os.Getenv("MONGO_URI"))
	serverAPIOptions := options.ServerAPI(options.ServerAPIVersion1)
	clientOptions := options.Client().ApplyURI(os.Getenv("MONGODB_URI")).SetServerAPIOptions(serverAPIOptions)
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	Client, err = mongo.Connect(ctx, clientOptions)
	if err != nil {
		log.Fatal(err)
	}
}

// GetUser returns a user from the database. If the user does not exist, it returns an empty user.
func GetUser(database string,
	collection string,
	key string,
	value string) (User, error) {

	var user User
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)

	err := Client.Database(database).Collection(collection).FindOne(ctx, bson.M{key: value}).Decode(&user)
	if err != nil {
		log.Println("User not found: ", err)
		return user, err
	}
	return user, nil
}

// PostUser adds a user to the database.
func PostUser(database string,
	collection string,
	user *User) (*mongo.InsertOneResult, error) {

	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)

	result, err := Client.Database(database).Collection(collection).InsertOne(ctx, user)
	if err != nil {
		log.Println("User could not be added: ", err)
		return result, err
	}
	return result, nil
}

// DeleteUser deletes a user from the database.
func DeleteUser(database string,
	collection string,
	key string,
	value string) (*mongo.DeleteResult, error) {

	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)

	result, err := Client.Database(database).Collection(collection).DeleteOne(ctx, bson.M{key: value})
	if err != nil {
		log.Println("Deletion failed: ", err)
		return result, err
	}
	return result, nil
}

// PutUserBalance updates a user's balance.
func UpdateUserBalance(database string,
	collection string,
	key string,
	value string,
	field string,
	amount float64) (*mongo.UpdateResult, error) {

	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)

	result, err := Client.Database(database).Collection(collection).UpdateOne(ctx, bson.M{key: value}, bson.M{"$set": bson.M{field: amount}})
	if err != nil {
		log.Println("Update failed: ", err)
		return result, err
	}
	return result, nil
}
