package main

import (
	"context"
	"log"
	"time"

	"github.com/JulianTeschner/CasinoIP2/handlers"
	"github.com/JulianTeschner/CasinoIP2/persistence"
	"github.com/gin-gonic/gin"
)

var ctx context.Context

func init() {
	ctx, _ = context.WithTimeout(context.Background(), 10*time.Second)
}

func main() {
	client, err := persistence.NewClient()
	if err != nil {
		panic(err)
	}
	client.Connect(ctx)
	defer client.Disconnect(ctx)

	router := gin.Default()
	router.GET("/api/user/:name/", handlers.GetUser)
	router.POST("/api/user", handlers.PostUser)
	router.Run() // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")

	log.Println("I was here")
}
