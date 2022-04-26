package user

import (
	// "context"
	// "encoding/json"
	// "io/ioutil"
	"log"
	"os"
	"testing"
	"time"

	"github.com/JulianTeschner/CasinoIP2/models"
	"go.mongodb.org/mongo-driver/bson"
	// "go.mongodb.org/mongo-driver/bson/primitive"
	// "time"
	//
	// "github.com/JulianTeschner/CasinoIP2/models"
	// "github.com/stretchr/testify/assert"
	// "go.mongodb.org/mongo-driver/bson"
	// "go.mongodb.org/mongo-driver/bson/primitive"
	// "go.mongodb.org/mongo-driver/mongo"
	// "go.mongodb.org/mongo-driver/mongo/options"
)

func TestMain(m *testing.M) {
	log.Println("setup suite")
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
	Client.Database("api_test_db").Collection("users").InsertOne(ctx, &dummyUser)
	return func() {
		Client.Database("api_test_db").Collection("users").DeleteOne(ctx, bson.M{"username": "fish"})
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

// func setup() func() {
// 	client, _ = mongo.NewClient(options.Client().ApplyURI("mongodb://root:password@localhost:27017/?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"))
// 	ctx, _ = context.WithTimeout(context.Background(), 10*time.Second)
// 	client.Connect(ctx)
//
// 	expected.ID = primitive.NewObjectID()
// 	expected.Username = "Test"
// 	expected.FirstName = "Test"
// 	expected.LastName = "Test"
// 	expected.DateOfBirth = time.Date(2000, 1, 1, 0, 0, 0, 0, time.UTC)
// 	expected.Email = "test@test.com"
// 	expected.Balance = models.Balance{
// 		Amount:      100,
// 		Currency:    "USD",
// 		LastDeposit: 100,
// 	}
// 	expected.Address = models.Address{
// 		Street: "123 Main St",
// 		City:   "Anytown",
// 		State:  "CA",
// 		Zip:    "12345",
// 	}
//
// 	// Return a function to teardown the test
// 	return func() {
// 		log.Println("teardown suite")
// 		client.Database("api_test_db").Collection("users").DeleteOne(ctx, &expected)
// 		client.Disconnect(ctx)
// 	}
// }
//
// func TestMainUser(m *testing.M) {
// 	log.Println("Setup models tests")
// 	teardown := setup()
// 	// Run the tests
// 	code := m.Run()
// 	// Exit with the code
// 	log.Println("teardown models tests")
// 	teardown()
// 	log.Println("Teardown models tests")
//
// 	os.Exit(code)
//
// }

//
// // TestCreateUser test marshalling and unmarshalling
// func TestUserBson(t *testing.T) {
//
// 	client.Database("api_test_db").Collection("users").InsertOne(ctx, &expected)
//
// 	cursor, _ := client.Database("api_test_db").Collection("users").Find(ctx, bson.M{"last_name": "Test"})
// 	var users []User
// 	_ = cursor.All(ctx, &users)
//
// 	if users[0].String() != expected.String() {
// 		t.Errorf("Expected %v, got %v", expected.String(), users[0].String())
// 	}
//
// }
//
// func TestUserJson(t *testing.T) {
// 	userJson, _ := json.Marshal(&expected)
// 	var user User
// 	_ = json.Unmarshal(userJson, &user)
// 	assert.Equal(t, user.String(), expected.String())
// }
