package models

import (
	"context"
	"log"
	"os"
	"testing"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var expected User
var ctx context.Context
var client *mongo.Client

func setup() func() {
	client, _ = mongo.NewClient(options.Client().ApplyURI("mongodb://root:password@localhost:27017/?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"))
	ctx, _ = context.WithTimeout(context.Background(), 10*time.Second)
	client.Connect(ctx)

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

	// Return a function to teardown the test
	return func() {
		log.Println("teardown suite")
		client.Database("api_test_db").Collection("users").DeleteOne(ctx, &expected)
		client.Disconnect(ctx)
	}
}

func TestMain(m *testing.M) {
	log.Println("Setup models tests")
	teardown := setup()
	// Run the tests
	code := m.Run()
	// Exit with the code
	log.Println("teardown models tests")
	teardown()
	log.Println("Teardown models tests")

	os.Exit(code)

}

// TestCreateUser test marshalling and unmarshalling
func TestUserString(t *testing.T) {

	client.Database("api_test_db").Collection("users").InsertOne(ctx, &expected)

	cursor, _ := client.Database("api_test_db").Collection("users").Find(ctx, bson.M{"last_name": "Test"})
	var users []User
	_ = cursor.All(ctx, &users)

	if users[0].String() != expected.String() {
		t.Errorf("Expected %v, got %v", expected.String(), users[0].String())
	}

}
