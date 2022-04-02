package persistence

import (
	"context"
	"log"
	"os"
	"testing"
	"time"

	"github.com/JulianTeschner/CasinoIP2/models"
	"github.com/stretchr/testify/assert"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

var expected models.User
var ctx context.Context
var client *mongo.Client

func setup() func() {
	client, _ = NewClient()
	ctx, _ = context.WithTimeout(context.Background(), 10*time.Second)
	client.Connect(ctx)

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

	deleteMe := models.User{
		ID:          primitive.NewObjectID(),
		FirstName:   "Please",
		LastName:    "Delete",
		DateOfBirth: time.Date(2000, 1, 1, 0, 0, 0, 0, time.UTC),
		Email:       "delete@me.com",
		Balance: models.Balance{
			Amount:   100,
			Currency: "USD",
			AmountOnDate: []models.AmountOnDate{{
				Amount: 100,
				Date:   time.Date(2000, 1, 1, 0, 0, 0, 0, time.UTC),
			}},
		},
		Address: models.Address{
			Street: "123 Main St",
			City:   "Anytown",
			State:  "CA",
			Zip:    "12345",
		},
	}

	res, err := client.Database("api_test_db").Collection("users").InsertOne(ctx, &expected)
	if err != nil {
		log.Fatal(err)
	}
	log.Println("Inserted a single document: ", res.InsertedID)
	client.Database("api_test_db").Collection("users").InsertOne(ctx, &deleteMe)
	// Return a function to teardown the test
	return func() {
		log.Println("teardown suite")
		client.Database("api_test_db").Collection("users").DeleteOne(ctx, &expected)
		client.Disconnect(ctx)
	}
}

func TestMain(m *testing.M) {
	log.Println("Setup persistence tests")
	teardown := setup()
	// Run the tests
	code := m.Run()
	// Exit with the code
	teardown()
	log.Println("Tear down persistence tests")

	os.Exit(code)

}

func TestCreateClient(t *testing.T) {

	testClient, _ := NewClient()
	if testClient == nil {
		t.Error("Client is nil")
	}
}

func TestGetValue(t *testing.T) {

	value := GetUser(client, "api_test_db", "users", "last_name", "Test")
	assert.Equal(t, expected, value)
}

func TestGetNonExistingValue(t *testing.T) {

	value := GetUser(client, "api_test_db", "users", "last_name", "NotExisting")
	assert.Equal(t, models.User{}, value)
}

func TestDeleteMe(t *testing.T) {

	value, _ := DeleteUser(client, "api_test_db", "users", "last_name", "Delete")
	assert.Equal(t, int64(1), value.DeletedCount)
}

func TestDeleteNoOne(t *testing.T) {

	value, _ := DeleteUser(client, "api_test_db", "users", "last_name", "NotExisting")
	assert.Equal(t, int64(0), value.DeletedCount)
}

func TestDeletionFail(t *testing.T) {
	c, _ := NewClient()
	_, err := DeleteUser(c, "api_test_db", "users", "last_name", "Please")
	assert.Error(t, err)
}
