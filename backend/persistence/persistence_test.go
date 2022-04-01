package persistence

import (
	"testing"
	"time"

	"github.com/JulianTeschner/CasinoIP2/models"
	"github.com/stretchr/testify/assert"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

var expected models.User

func init() {
	expected.ID = primitive.NewObjectID()
	expected.FirstName = "Test"
	expected.LastName = "Test"
	expected.DateOfBirth = time.Date(2000, 1, 1, 0, 0, 0, 0, time.UTC)
	expected.Email = "test@test.com"
	expected.Balance = models.Balance{
		Amount:   100,
		Currency: "USD",
		AmountOnDate: []models.AmountOnDate{{
			Amount: 100,
			Date:   time.Date(2000, 1, 1, 0, 0, 0, 0, time.UTC),
		}},
	}
	expected.Address = models.Address{
		Street: "123 Main St",
		City:   "Anytown",
		State:  "CA",
		Zip:    "12345",
	}

	client := CreateDbConnection()
	collection := GetCollection(client, "api_test_db", "users")
	collection.InsertOne(ctx, expected)

}

func TestCreateConnection(t *testing.T) {

	client := CreateDbConnection()
	if client == nil {
		t.Error("Client is nil")
	}
}

func TestGetCollection(t *testing.T) {

	client := CreateDbConnection()
	collection := GetCollection(client, "api_test_db", "users")
	if collection == nil {
		t.Error("Collection is nil")
	}
}

func TestDisconnect(t *testing.T) {

	client := CreateDbConnection()
	err := Disconnect(client)
	if err != nil {
		t.Error("Error disconnecting")
	}
}

func TestGetValue(t *testing.T) {

	client := CreateDbConnection()
	value := GetUser(client, "api_test_db", "users", "last_name", "Test")
	if value.LastName != "Test" {
		t.Error("Value is not equal")
	}
}

func TestGetNonExistingValue(t *testing.T) {

	client := CreateDbConnection()
	// collection := GetCollection(client, "api_test_db", "users")
	val := GetUser(client, "api_test_db", "users", "last_name", "NotExisting")
	assert.Equal(t, models.User{}, val)
}
