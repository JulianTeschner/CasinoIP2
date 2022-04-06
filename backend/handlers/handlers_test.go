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

var router *gin.Engine

func setup() func() {
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	persistence.NewClient()
	router = SetupRouter()
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
	resp, _ := http.NewRequest("GET", "/api/user/Doe", nil)
	resp.Header.Add("Authorization", "Basic YWRtaW46YWRtaW4=")
	router.ServeHTTP(w, resp)
	assert.Equal(t, http.StatusOK, w.Code)
}

func TestGetUserNotFound(t *testing.T) {
	log.Println("TestGetUserNotFound")
	w := httptest.NewRecorder()
	resp, _ := http.NewRequest("GET", "/api/user/NotFound", nil)
	resp.Header.Add("Authorization", "Basic YWRtaW46YWRtaW4=")
	router.ServeHTTP(w, resp)
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
	resp, _ := http.NewRequest("POST", "/api/user", bytes.NewBuffer(data))
	resp.Header.Set("Content-Type", "application/json; charset=UTF-8")
	resp.Header.Add("Authorization", "Basic YWRtaW46YWRtaW4=")
	router.ServeHTTP(w, resp)
	assert.Equal(t, http.StatusOK, w.Code)
}

func TestDeleteUser(t *testing.T) {
	log.Println("TestDeleteUser")
	w := httptest.NewRecorder()
	resp, _ := http.NewRequest("DELETE", "/api/user/Post", nil)
	resp.Header.Add("Authorization", "Basic YWRtaW46YWRtaW4=")
	router.ServeHTTP(w, resp)
	assert.Equal(t, http.StatusOK, w.Code)
}

func TestDeleteUserNotFound(t *testing.T) {
	log.Println("TestDeleteUserNotFound")
	w := httptest.NewRecorder()
	persistence.Client.Disconnect(context.Background())
	resp, _ := http.NewRequest("DELETE", "/api/user/NotFound", nil)
	resp.Header.Add("Authorization", "Basic YWRtaW46YWRtaW4=")
	router.ServeHTTP(w, resp)
	assert.Equal(t, http.StatusNotFound, w.Code)
}
