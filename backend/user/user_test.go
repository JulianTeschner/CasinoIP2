package user

import (
	// "io/ioutil"
	"log"
	"os"
	"testing"
	"time"

	"github.com/JulianTeschner/CasinoIP2/models"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/bson"
)

func TestMain(m *testing.M) {
	path, _ := os.Getwd()
	path = path + "/../cmd/.env"
	log.Println(path)
	err := godotenv.Load(path)
	if err != nil {
		log.Println("No .env file found, using default values")
	}

	// log.SetOutput(ioutil.Discard)
	NewClient()
	teardownHandlers := setupHandlersTest()
	// Run the tests
	code := m.Run()
	// Exit with the code
	log.Println("Tear down persistence tests")
	teardownHandlers()
	defer Client.Disconnect(ctx)

	os.Exit(code)
}

func addDummyUserToDb() func() {
	dummyUser := createDummyUser()
	Client.Database(os.Getenv("MONGO_INITDB_ROOT_DATABASE")).Collection("users").InsertOne(ctx, &dummyUser)
	return func() {
		Client.Database(os.Getenv("MONGO_INITDB_ROOT_DATABASE")).Collection("users").DeleteOne(ctx, bson.M{"username": "fish"})
	}
}
func createDummyUser() User {

	dummyUser := User{
		// ID:          primitive.NewObjectID(),
		Username:    "fish",
		FirstName:   "dummy",
		LastName:    "user",
		DateOfBirth: time.Date(2000, 1, 1, 0, 0, 0, 0, time.UTC),
		Email:       "delete@me.com",
		Balance: models.Balance{
			Amount:      100,
			Currency:    "USD",
			LastDeposit: 100,
		},
		Address: models.Address{
			Street: "123 Main St",
			City:   "Anytown",
			State:  "CA",
			Zip:    "12345",
		},
	}
	return dummyUser
}
