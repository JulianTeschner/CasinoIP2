package models

import (
	"context"
	"testing"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var ctx context.Context

var expected User

func init() {
	expected.ID = primitive.NewObjectID()
	expected.FirstName = "Test"
	expected.LastName = "Test"
	expected.DateOfBirth = time.Date(2000, 1, 1, 0, 0, 0, 0, time.UTC)
	expected.Email = "test@test.com"
	expected.Balance = Balance{
		Amount:   100,
		Currency: "USD",
		AmountOnDate: []AmountOnDate{{
			Amount: 100,
			Date:   time.Date(2000, 1, 1, 0, 0, 0, 0, time.UTC),
		}},
	}
	expected.Address = Address{
		Street: "123 Main St",
		City:   "Anytown",
		State:  "CA",
		Zip:    "12345",
	}

	ctx, _ = context.WithTimeout(context.Background(), 10*time.Second)

}

// TestCreateUser test marshalling and unmarshalling
func TestUserString(t *testing.T) {

	client, _ := mongo.NewClient(options.Client().ApplyURI("mongodb://root:password@localhost:27017/?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"))

	client.Connect(ctx)
	defer client.Disconnect(ctx)

	collection := client.Database("api_test_db").Collection("users")
	collection.InsertOne(ctx, &expected)

	cursor, _ := collection.Find(ctx, bson.M{"last_name": "Test"})
	var users []User
	_ = cursor.All(ctx, &users)

	if users[0].String() != expected.String() {
		t.Errorf("Expected %v, got %v", expected.String(), users[0].String())
	}

}
