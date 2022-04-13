package main

import (
	"context"
	"log"
	"time"

	"github.com/JulianTeschner/CasinoIP2/persistence"
	"github.com/JulianTeschner/CasinoIP2/router"
)

var ctx context.Context

func init() {
	ctx, _ = context.WithTimeout(context.Background(), 10*time.Second)
}

func main() {
	persistence.NewClient()
	defer persistence.Client.Disconnect(ctx)

	r := router.New()
	err := r.Run(":8080")
	if err != nil {
		log.Fatalln(err)
	}

}
