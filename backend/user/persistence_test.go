package user

import (
	"context"
	"os"
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

var expected User
var ctx context.Context

func TestCreateClient(t *testing.T) {
	client := Client
	expected = createDummyUser()
	NewClient()
	assert.NotEqual(t, Client, client)
}

func TestGetValue(t *testing.T) {
	teardown := addDummyUserToDb()
	value, _ := GetUser(os.Getenv("MONGO_INITDB_TEST_DATABASE"), "users", "username", "fish")
	assert.Equal(t, expected, value)
	defer teardown()
}

func TestGetNonExistingValue(t *testing.T) {
	_, err := GetUser(os.Getenv("MONGO_INITDB_TEST_DATABASE"), "users", "username", "NotExisting")
	assert.NotNil(t, err)
}

func TestDeleteMe(t *testing.T) {
	addDummyUserToDb()
	value, _ := DeleteUser(os.Getenv("MONGO_INITDB_TEST_DATABASE"), "users", "username", "fish")
	assert.Equal(t, int64(1), value.DeletedCount)
}

func TestDeleteNoOne(t *testing.T) {
	value, _ := DeleteUser(os.Getenv("MONGO_INITDB_TEST_DATABASE"), "users", "username", "NotExisting")
	assert.Equal(t, int64(0), value.DeletedCount)
}

func TestDeletionFail(t *testing.T) {
	Client.Disconnect(ctx)
	_, err := DeleteUser(os.Getenv("MONGO_INITDB_TEST_DATABASE"), "users", "username", "Please")
	NewClient()
	assert.Error(t, err)

}

func TestPostUser(t *testing.T) {
	var user User
	user.ID = primitive.NewObjectID()
	user.Username = "Me"
	user.FirstName = "Post"
	user.LastName = "Me"
	user.DateOfBirth = time.Date(2000, 1, 1, 0, 0, 0, 0, time.UTC)
	result, _ := PostUser(os.Getenv("MONGO_INITDB_TEST_DATABASE"), "users", &user)
	DeleteUser(os.Getenv("MONGO_INITDB_TEST_DATABASE"), "users", "username", "Me")
	assert.Equal(t, user.ID, result.InsertedID)
}

func TestPostUserFail(t *testing.T) {
	var user User
	Client.Disconnect(ctx)
	user.ID = primitive.NewObjectID()
	user.FirstName = "Post"
	user.LastName = "Me"
	user.DateOfBirth = time.Date(2000, 1, 1, 0, 0, 0, 0, time.UTC)
	_, err := PostUser(os.Getenv("MONGO_INITDB_TEST_DATABASE"), "users", &user)
	NewClient()
	assert.Error(t, err)
}

func TestUpdateUserBalance(t *testing.T) {
	teardown := addDummyUserToDb()
	UpdateUserBalance(os.Getenv("MONGO_INITDB_TEST_DATABASE"), "users", "username", "fish", "balance.amount", 500)
	user, _ := GetUser(os.Getenv("MONGO_INITDB_TEST_DATABASE"), "users", "username", "fish")
	assert.Equal(t, float64(500), user.Balance.Amount)
	defer teardown()
}

func TestUpdateUserBalanceFail(t *testing.T) {
	Client.Disconnect(ctx)
	_, err := UpdateUserBalance(os.Getenv("MONGO_INITDB_TEST_DATABASE"), "users", "username", "fish", "balance.amount", 500)
	assert.Error(t, err)
	NewClient()
}

func TestUpdateUserStreak(t *testing.T) {
	teardown := addDummyUserToDb()
	UpdateLoginStreak(os.Getenv("MONGO_INITDB_TEST_DATABASE"), "users", "username", "fish")
	user, _ := GetUser(os.Getenv("MONGO_INITDB_TEST_DATABASE"), "users", "username", "fish")
	assert.Equal(t, 4, user.LoginStreak)
	defer teardown()
}

func TestUpdateUserStreakNoChange(t *testing.T) {
	teardown := addDummyUserToDb()
	UpdateLoginStreak(os.Getenv("MONGO_INITDB_TEST_DATABASE"), "users", "username", "fish")
	UpdateLoginStreak(os.Getenv("MONGO_INITDB_TEST_DATABASE"), "users", "username", "fish")
	user, _ := GetUser(os.Getenv("MONGO_INITDB_TEST_DATABASE"), "users", "username", "fish")
	assert.Equal(t, 4, user.LoginStreak)
	defer teardown()
}

func TestUpdateUserStreakReset(t *testing.T) {
	teardown := addDummyUserToDb2()
	UpdateLoginStreak(os.Getenv("MONGO_INITDB_TEST_DATABASE"), "users", "username", "fish2")
	user, _ := GetUser(os.Getenv("MONGO_INITDB_TEST_DATABASE"), "users", "username", "fish2")
	assert.Equal(t, 1, user.LoginStreak)
	defer teardown()
}
