package utils

import (
	"context"
	"errors"

	"github.com/aashish47/finance-tracker/backend/middleware"
	"github.com/dgrijalva/jwt-go"
)

func GetUserIDFromContext(ctx context.Context) (string, error) {
	key := middleware.ContextKeyClaims
	claims, ok := ctx.Value(key).(jwt.MapClaims)
	if !ok {
		return "", errors.New("failed to retrieve claims from context")
	}

	userId, ok := claims["sub"].(string)
	if !ok {
		return "", errors.New("user id not found in claims")
	}

	return userId, nil
}
