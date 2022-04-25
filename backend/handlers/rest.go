package handlers

import (
	"log"
	"net/http"
	"strconv"

	"github.com/JulianTeschner/CasinoIP2/models"
	"github.com/JulianTeschner/CasinoIP2/persistence"

	"github.com/gin-gonic/gin"
)

// GetUser is the handler for the GET api/user/* route
func GetUser(c *gin.Context) {
	name := c.Param("name")
	log.Println("GetUser: ", name)

	var err error
	user, err := persistence.GetUser("api_test_db", "users", "username", name)
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

func PatchUser(c *gin.Context) {
	log.Println("PutUserBalance")
	name := c.Param("name")
	c.Request.ParseForm()
	var fields []string
	var values []string

	for k, v := range c.Request.PostForm {
		fields = append(fields, k)
		values = append(values, v[0])
	}

	value, err := strconv.ParseFloat(c.Request.FormValue(values[0]), 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	result, err := persistence.PutUserBalance("api_test_db", "users", "username", name, fields[0], value)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, result)

}
