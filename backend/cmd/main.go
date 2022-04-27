package main

import (
	"context"
	"log"
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
		log.Fatalf("Error loading .env file: %v", err)
	}
	user.NewClient()
	defer user.Client.Disconnect(ctx)

	r := router.New()
	err = r.Run(":8080")
	if err != nil {
		log.Fatalln(err)
	}

}
