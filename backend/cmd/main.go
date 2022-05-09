package main

import (
	"context"
	"log"
	"os"
	"time"

	"github.com/JulianTeschner/CasinoIP2/router"
	"github.com/JulianTeschner/CasinoIP2/user"
	"github.com/joho/godotenv"
)

// @title        CasinoApi
// @version      1.0
// @description  This is a simple API for the Casino Project.

// @host      localhost:8080
// @BasePath  https://localhost:8080/

var ctx context.Context

func init() {
	ctx, _ = context.WithTimeout(context.Background(), 10*time.Second)
}

func main() {
	err := godotenv.Load("../.env")
	if err != nil {
		log.Println("No .env file found, using default values")
	}

	user.NewClient()
	defer user.Client.Disconnect(ctx)

	r := router.New()
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	err = r.Run(":" + port)
	if err != nil {
		log.Fatalln(err)
	}

}
