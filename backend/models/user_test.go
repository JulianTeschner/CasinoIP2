package models

import (
	"context"
	"fmt"
	"testing"
	"time"

	"github.com/JulianTeschner/CasinoIP2/persistence"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
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

func TestUserString(t *testing.T) {

	client := persistence.CreateDbConnection()

	defer persistence.Disconnect(client)

	usersCollection := persistence.GetCollection(client, "api_test_db", "users")

	usersCollection.InsertOne(ctx, &expected)

	var actual User

	cursor := usersCollection.FindOne(ctx, bson.M{"FirstName": "Test"})

	if err := cursor.Decode(&actual); err != nil {
		t.Errorf("Error decoding user: %v", err)
	}

	fmt.Println(actual)
	if actual.String() != expected.String() {
		t.Errorf("Expected %v, got %v", expected.String(), actual.String())
	}

}
