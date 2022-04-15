package handlers

import (
	"bytes"
	"context"
	"encoding/json"
	"log"
	"net/http"
	"net/http/httptest"
	"os"
	"testing"
	"time"

	"github.com/JulianTeschner/CasinoIP2/models"
	"github.com/JulianTeschner/CasinoIP2/persistence"
	"github.com/gin-gonic/gin"

	"github.com/stretchr/testify/assert"

	_ "go.mongodb.org/mongo-driver/bson/primitive"
)

var token string
var r *gin.Engine

func setup() func() {
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)

	persistence.NewClient()

	r = gin.Default()
	r.GET("/user/:name", GetUser)
	r.POST("/user", PostUser)
	r.DELETE("/user/:name", DeleteUser)

	// Client.Database("casino").Collection("users").InsertOne(ctx, &models.User{
	//     FirstName: "",

	return func() {
		log.Println("teardown suite")
		persistence.Client.Disconnect(ctx)
	}
}

func TestMain(m *testing.M) {
	log.Println("Setup handlers tests")
	teardown := setup()
	// Run the tests
	code := m.Run()
	// Exit with the code
	teardown()

	os.Exit(code)
}

func TestGetUser(t *testing.T) {
	log.Println("TestGetUser")
	w := httptest.NewRecorder()
	resp, _ := http.NewRequest("GET", "/user/Doe", nil)
	r.ServeHTTP(w, resp)
	assert.Equal(t, http.StatusOK, w.Code)
}

func TestGetUserNotFound(t *testing.T) {
	log.Println("TestGetUserNotFound")
	w := httptest.NewRecorder()
	resp, _ := http.NewRequest("GET", "/user/NotFound", nil)
	r.ServeHTTP(w, resp)
	assert.Equal(t, http.StatusNotFound, w.Code)
}

func TestPostUser(t *testing.T) {
	log.Println("TestPostUser")
	w := httptest.NewRecorder()
	data, err := json.Marshal(&models.User{
		LastName: "Post",
	})
	if err != nil {
		log.Fatal(err)
	}
	resp, _ := http.NewRequest("POST", "/user", bytes.NewBuffer(data))
	resp.Header.Set("Content-Type", "application/json; charset=UTF-8")
	r.ServeHTTP(w, resp)
	assert.Equal(t, http.StatusOK, w.Code)
}

func TestDeleteUser(t *testing.T) {
	log.Println("TestDeleteUser")
	w := httptest.NewRecorder()
	resp, _ := http.NewRequest("DELETE", "/user/Post", nil)
	r.ServeHTTP(w, resp)
	assert.Equal(t, http.StatusOK, w.Code)
}

func TestDeleteUserNotFound(t *testing.T) {
	log.Println("TestDeleteUserNotFound")
	w := httptest.NewRecorder()
	persistence.Client.Disconnect(context.Background())
	resp, _ := http.NewRequest("DELETE", "/user/NotFound", nil)
	r.ServeHTTP(w, resp)
	assert.Equal(t, http.StatusNotFound, w.Code)
}
