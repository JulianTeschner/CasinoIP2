package router

import (
	"log"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestNew(t *testing.T) {
	log.Println("TestNew")
	r := New()
	assert.NotNil(t, r)
}
