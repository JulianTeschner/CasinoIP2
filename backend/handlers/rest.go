package handlers

import (
	"context"
	"log"
	"net/http"

	"github.com/JulianTeschner/CasinoIP2/models"
	"github.com/JulianTeschner/CasinoIP2/persistence"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/mongo"
)

var client *mongo.Client
var ctx context.Context

func init() {
	var err error
	client, err = persistence.NewClient()
	if err != nil {
		panic(err)
	}
	client.Connect(ctx)
}

// GetUser is the handler for the GET api/user/* route
func GetUser(c *gin.Context) {
	name := c.Param("name")
	log.Println("GetUser: ", name)

	var err error
	user := persistence.GetUser(client, "api_test_db", "users", "last_name", name)
	log.Println(user)
	if user.FirstName == "" {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, &user)
}

// PostUser is the handler for the POST api/user/* route
func PostUser(c *gin.Context) {
	var user models.User
	c.Request.ParseForm()
	err := c.BindJSON(&user)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	log.Println("PostUser: ", user)

	_, err = persistence.PostUser(client, "api_test_db", "users", &user)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, &user)
}
