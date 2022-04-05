package handlers

import (
	"log"
	"net/http"

	"github.com/JulianTeschner/CasinoIP2/models"
	"github.com/JulianTeschner/CasinoIP2/persistence"
	"github.com/gin-gonic/gin"
)

// GetUser is the handler for the GET api/user/* route
func GetUser(c *gin.Context) {
	name := c.Param("name")
	log.Println("GetUser: ", name)

	var err error
	user, err := persistence.GetUser("api_test_db", "users", "last_name", name)
	if err != nil {
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
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}
	_, err = persistence.PostUser("api_test_db", "users", &user)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, &user)
}

func DeleteUser(c *gin.Context) {
	name := c.Param("name")
	log.Println("DeleteUser: ", name)

	result, err := persistence.DeleteUser("api_test_db", "users", "last_name", name)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, result)
}

func SetupRouter() *gin.Engine {
	log.Println("Setting up router")
	router := gin.Default()
	router.GET("/api/user/:name", GetUser)
	router.POST("/api/user", PostUser)
	router.DELETE("/api/user/:name", DeleteUser)
	return router
}
