package models

import (
	"testing"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

var expected User

func init() {
	expected.ID = primitive.NewObjectID()
	expected.FirstName = "John"
	expected.LastName = "Doe"
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
}

func TestUserString(t *testing.T) {
	val, err := bson.Marshal(expected)
	if err != nil {
		t.Error(err)
	}
	var u User
	if bson.Unmarshal(val, &u) != nil {
		t.Error("Unmarshal failed")
	}

	if u.String() != expected.String() {
		t.Errorf("Expected %s, got %s", expected.String(), u.String())
	}

}
