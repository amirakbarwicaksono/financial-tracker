package middleware

import (
	"context"
	"fmt"
	"net/http"
	"os"
	"strings"

	"github.com/dgrijalva/jwt-go"
)

// Define a custom type for the context key
type ContextKey string

// Define context keys for different values
const (
	ContextKeyClaims ContextKey = "claims"
)

func ValidateToken(tokenString string) (jwt.MapClaims, error) {
	secret := os.Getenv("JWT_SECRET")
	// Parse the token
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		// Check the signing method
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		// Return the secret key used for signing
		return []byte(secret), nil
	})
	if err != nil {
		return nil, err
	}

	// Verify token validity
	if !token.Valid {
		return nil, fmt.Errorf("invalid token")
	}

	// Extract claims
	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		return claims, nil
	}
	return nil, fmt.Errorf("unable to extract claims")
}

func AuthMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		authorizationHeader := r.Header.Get("Authorization")
		token := strings.TrimPrefix(authorizationHeader, "Bearer ")

		claims, err := ValidateToken(token)
		if err != nil {
			http.Error(w, fmt.Sprintf("Unauthorized: %v", err), http.StatusUnauthorized)
			return
		}

		ctx := context.WithValue(r.Context(), ContextKeyClaims, claims)
		r = r.WithContext(ctx)
		next.ServeHTTP(w, r)
	})
}
