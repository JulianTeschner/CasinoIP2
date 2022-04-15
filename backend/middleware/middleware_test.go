package middleware

import (
	"context"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestValidate(t *testing.T) {
	cc := CustomClaims{}
	assert.Nil(t, cc.Validate(context.Background()))
}

func TestEnsureValidToken(t *testing.T) {
	f := EnsureValidToken()
	assert.NotNil(t, f)
}
