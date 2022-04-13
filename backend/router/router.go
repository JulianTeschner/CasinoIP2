package router

import (
	"log"

	"github.com/JulianTeschner/CasinoIP2/handlers"
	"github.com/JulianTeschner/CasinoIP2/middleware"
	"github.com/gin-gonic/gin"

	"github.com/gwatts/gin-adapter"
	"github.com/joho/godotenv"
)

// New returns a new router
func New() *gin.Engine {
	log.Println("Setting up router")
	gin.ForceConsoleColor()

	err := godotenv.Load("../.env")
	if err != nil {
		log.Fatalf("Error loading .env file: %v", err)
	}

	r := gin.Default()

	// Wrap the http handler with gin adapter
	r.Use(adapter.Wrap(middleware.EnsureValidToken()))

	r.GET("/user/:name", handlers.GetUser)
	r.POST("/user", handlers.PostUser)
	r.DELETE("/user/:name", handlers.DeleteUser)

	return r
}
