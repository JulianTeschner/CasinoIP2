package router

import (
	"context"
	"log"
	"net/http"
	"net/http/httptest"
	"os"
	"testing"
	"time"

	"github.com/JulianTeschner/CasinoIP2/handlers"
	"github.com/JulianTeschner/CasinoIP2/persistence"
	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
)

var r *gin.Engine

func setup() func() {
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)

	persistence.NewClient()

	// r = New()
	r = gin.Default()

	r.GET("/user/:name", handlers.GetUser)
	r.POST("/user", handlers.PostUser)
	r.DELETE("/user/:name", handlers.DeleteUser)

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

func TestNew(t *testing.T) {
	log.Println("TestNew")
	r := New()
	assert.NotNil(t, r)
}

func TestGetUser(t *testing.T) {
	log.Println("TestGetUser")
	w := httptest.NewRecorder()
	resp, _ := http.NewRequest("GET", "/user/Doe", nil)
	r.ServeHTTP(w, resp)
	assert.Equal(t, http.StatusOK, w.Code)
}
