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
	NewClient()
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

	res, err := Client.Database("api_test_db").Collection("users").InsertOne(ctx, &expected)
	if err != nil {
		log.Fatal(err)
	}
	log.Println("Inserted a single document: ", res.InsertedID)
	Client.Database("api_test_db").Collection("users").InsertOne(ctx, &deleteMe)
	// Return a function to teardown the test
	return func() {
		log.Println("teardown suite")
		Client.Database("api_test_db").Collection("users").DeleteOne(ctx, &expected)
		Client.Disconnect(ctx)
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
	client := Client
	NewClient()
	assert.NotEqual(t, Client, client)
}

func TestGetValue(t *testing.T) {

	value, _ := GetUser("api_test_db", "users", "last_name", "Test")
	assert.Equal(t, expected, value)
}

func TestGetNonExistingValue(t *testing.T) {

	_, err := GetUser("api_test_db", "users", "last_name", "NotExisting")
	assert.NotNil(t, err)
}

func TestDeleteMe(t *testing.T) {

	value, _ := DeleteUser("api_test_db", "users", "last_name", "Delete")
	assert.Equal(t, int64(1), value.DeletedCount)
}

func TestDeleteNoOne(t *testing.T) {

	value, _ := DeleteUser("api_test_db", "users", "last_name", "NotExisting")
	assert.Equal(t, int64(0), value.DeletedCount)
}

func TestDeletionFail(t *testing.T) {
	Client.Disconnect(ctx)
	_, err := DeleteUser("api_test_db", "users", "last_name", "Please")
	NewClient()
	assert.Error(t, err)

}

func TestPostUser(t *testing.T) {
	var user models.User
	user.ID = primitive.NewObjectID()
	user.FirstName = "Post"
	user.LastName = "Me"
	user.DateOfBirth = time.Date(2000, 1, 1, 0, 0, 0, 0, time.UTC)
	result, _ := PostUser("api_test_db", "users", &user)
	DeleteUser("api_test_db", "users", "last_name", "Me")
	assert.Equal(t, user.ID, result.InsertedID)
}

func TestPostUserFail(t *testing.T) {
	var user models.User
	Client.Disconnect(ctx)
	user.ID = primitive.NewObjectID()
	user.FirstName = "Post"
	user.LastName = "Me"
	user.DateOfBirth = time.Date(2000, 1, 1, 0, 0, 0, 0, time.UTC)
	_, err := PostUser("api_test_db", "users", &user)
	NewClient()
	assert.Error(t, err)
}
