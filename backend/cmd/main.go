package main

import (
	"context"
	"time"
)

var ctx context.Context

func init() {
	ctx, _ = context.WithTimeout(context.Background(), 10*time.Second)
}

func main() {

}
