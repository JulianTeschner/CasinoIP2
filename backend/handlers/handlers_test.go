package handlers

import (
	"context"
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
	"go.mongodb.org/mongo-driver/bson/primitive"
)

var router *gin.Engine

func setup() func() {
	persistence.NewClient()
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	defer persistence.Client.Disconnect(ctx)
	// expected.ID = primitive.NewObjectID()
	// expected.FirstName = "Test"
	// expected.LastName = "Test"
	// expected.DateOfBirth = time.Date(2000, 1, 1, 0, 0, 0, 0, time.UTC)
	// expected.Email = "test@test.com"
	// expected.Balance = models.Balance{
	// 	Amount:   100,
	// 	Currency: "USD",
	// 	AmountOnDate: []models.AmountOnDate{{
	// 		Amount: 100,
	// 		Date:   time.Date(2000, 1, 1, 0, 0, 0, 0, time.UTC),
	// 	}},
	// }
	// expected.Address = models.Address{
	// 	Street: "123 Main St",
	// 	City:   "Anytown",
	// 	State:  "CA",
	// 	Zip:    "12345",
	// }
	//
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

	persistence.Client.Database("api_test_db").Collection("users").InsertOne(ctx, &deleteMe)
	// Return a function to teardown the test
	return func() {
		log.Println("teardown suite")
		// client.Database("api_test_db").Collection("users").DeleteOne(ctx, &expected)
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
	persistence.NewClient()
	router = SetupRouter()
	w := httptest.NewRecorder()
	resp, _ := http.NewRequest("GET", "/api/user/Doe", nil)
	router.ServeHTTP(w, resp)
	assert.Equal(t, http.StatusOK, w.Code)
}

// func TestGetUser(t *testing.T) {
//     var user &models.User
//     GetUser(ctx, client, expected.ID, &user)
