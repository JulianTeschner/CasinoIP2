package user

import (
	"context"
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

var expected User
var ctx context.Context

func TestCreateClient(t *testing.T) {
	client := Client
	NewClient()
	assert.NotEqual(t, Client, client)
}

func TestGetValue(t *testing.T) {
	teardown := addDummyUserToDb()
	value, _ := GetUser("api_test_db", "users", "username", "Test")
	assert.Equal(t, expected, value)
	defer teardown()
}

func TestGetNonExistingValue(t *testing.T) {
	_, err := GetUser("api_test_db", "users", "username", "NotExisting")
	assert.NotNil(t, err)
}

func TestDeleteMe(t *testing.T) {
	addDummyUserToDb()
	value, _ := DeleteUser("api_test_db", "users", "username", "fish")
	assert.Equal(t, int64(1), value.DeletedCount)
}

func TestDeleteNoOne(t *testing.T) {
	value, _ := DeleteUser("api_test_db", "users", "username", "NotExisting")
	assert.Equal(t, int64(0), value.DeletedCount)
}

func TestDeletionFail(t *testing.T) {
	Client.Disconnect(ctx)
	_, err := DeleteUser("api_test_db", "users", "username", "Please")
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
	result, _ := PostUser("api_test_db", "users", &user)
	DeleteUser("api_test_db", "users", "username", "Me")
	assert.Equal(t, user.ID, result.InsertedID)
}

func TestPostUserFail(t *testing.T) {
	var user User
	Client.Disconnect(ctx)
	user.ID = primitive.NewObjectID()
	user.FirstName = "Post"
	user.LastName = "Me"
	user.DateOfBirth = time.Date(2000, 1, 1, 0, 0, 0, 0, time.UTC)
	_, err := PostUser("api_test_db", "users", &user)
	NewClient()
	assert.Error(t, err)
}

func TestPutUserBalance(t *testing.T) {
	teardown := addDummyUserToDb()
	UpdateUserBalance("api_test_db", "users", "username", "fish", "balance.amount", 500)
	user, _ := GetUser("api_test_db", "users", "username", "fish")
	assert.Equal(t, float64(500), user.Balance.Amount)
	defer teardown()
}

func TestPutUserBalanceFail(t *testing.T) {
	Client.Disconnect(ctx)
	_, err := UpdateUserBalance("api_test_db", "users", "username", "fish", "balance.amount", 500)
	assert.Error(t, err)
	NewClient()
}
