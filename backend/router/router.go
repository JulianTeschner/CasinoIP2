package router

import (
	"log"

	"github.com/JulianTeschner/CasinoIP2/handlers"
	"github.com/JulianTeschner/CasinoIP2/middleware"
	"github.com/gin-gonic/gin"

	"github.com/gwatts/gin-adapter"
)

// New returns a new router
func New() *gin.Engine {
	log.Println("Setting up router")
	gin.ForceConsoleColor()

	r := gin.Default()

	// Wrap the http handler with gin adapter
	user := r.Group("/user")
	user.Use(adapter.Wrap(middleware.EnsureValidToken()))
	{
		user.GET("/:name", handlers.GetUser)
		user.PATCH("/:name", handlers.PatchUser)
		user.POST("/", handlers.PostUser)
		user.DELETE("/:name", handlers.DeleteUser)
	}

	return r
}
