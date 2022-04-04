package main

import (
	"context"
	"time"

	"github.com/JulianTeschner/CasinoIP2/handlers"
	"github.com/JulianTeschner/CasinoIP2/persistence"
)

var ctx context.Context

func init() {
	ctx, _ = context.WithTimeout(context.Background(), 10*time.Second)
}

func main() {
	persistence.NewClient()
	defer persistence.Client.Disconnect(ctx)

	router := handlers.SetupRouter()
	router.Run(":8080")

}
