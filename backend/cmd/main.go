package main

import (
	"context"
	"log"
	"time"

	"github.com/JulianTeschner/CasinoIP2/persistence"
	"github.com/JulianTeschner/CasinoIP2/router"
	"github.com/joho/godotenv"
)

var ctx context.Context

func init() {
	ctx, _ = context.WithTimeout(context.Background(), 10*time.Second)
}

func main() {
	err := godotenv.Load("../.env")
	if err != nil {
		log.Fatalf("Error loading .env file: %v", err)
	}
	persistence.NewClient()
	defer persistence.Client.Disconnect(ctx)

	r := router.New()
	err = r.Run(":8080")
	if err != nil {
		log.Fatalln(err)
	}

}
