package persistence

import (
	"fmt"
	"testing"
)

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
	value := GetValue(client, "api_test_db", "users", "last_name", "Test")
	fmt.Println(value)
	if value.LastName != "Test" {
		t.Error("Value is not equal")
	}
}

func TestGetNonExistingValue(t *testing.T) {

	client := CreateDbConnection()
	// collection := GetCollection(client, "api_test_db", "users")
	value := GetValue(client, "api_test_db", "users", "last_name", "Test")
	fmt.Println(value)
	if value.LastName != "Test" {
		t.Error("Value is not equal")
	}
}
