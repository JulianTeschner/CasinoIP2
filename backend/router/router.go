package router

import (
	"log"

	"github.com/JulianTeschner/CasinoIP2/middleware"
	"github.com/JulianTeschner/CasinoIP2/user"
	"github.com/gin-gonic/gin"
	"github.com/gin-contrib/cors"
	"github.com/gwatts/gin-adapter"
)

// New returns a new router
func New() *gin.Engine {
	log.Println("Setting up router")
	gin.ForceConsoleColor()

	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{"POST", "GET", "PATCH", "DELETE"},
		AllowHeaders: []string{"Content-Type, access-control-allow-origin, access-control-allow-headers, Authorization"},
	}))

	// Wrap the http handler with gin adapter
	userGroup := r.Group("/user")
	userGroup.Use(adapter.Wrap(middleware.EnsureValidToken()))
	{
		userGroup.GET("/:name", user.GetUserHandler)
		userGroup.PATCH("/balance/amount/:name", user.PatchUserBalanceHandler)
		userGroup.PATCH("/balance/lastdeposit/:name", user.PatchUserLastDepositHandler)
		userGroup.PATCH("/streak/:name", user.PatchLoginStreakHandler)
		userGroup.POST("", user.PostUserHandler)
		userGroup.DELETE("/:name", user.DeleteUserHandler)
	}
	return r
}
