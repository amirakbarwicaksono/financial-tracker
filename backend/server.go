package main

import (
	"log"
	"net/http"
	"os"

	"github.com/aashish47/finance-tracker/backend/middleware"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/aashish47/finance-tracker/backend/config"
	"github.com/aashish47/finance-tracker/backend/graph"
	_ "github.com/joho/godotenv/autoload"
	"github.com/rs/cors"
)

const defaultPort = "8080"

func main() {

	db := config.InitDB()

	resolver := graph.NewResolver(db)

	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}

	srv := handler.NewDefaultServer(graph.NewExecutableSchema(graph.Config{Resolvers: resolver}))

	// Enable CORS
	authMiddleware := middleware.AuthMiddleware(srv)
	corsHandler := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000"}, // Replace with your frontend's origin
		AllowedMethods:   []string{"GET", "POST", "OPTIONS"},
		AllowedHeaders:   []string{"Content-Type", "Authorization"},
		AllowCredentials: true,
	}).Handler(authMiddleware)

	http.Handle("/", playground.Handler("GraphQL playground", "/query"))
	// http.Handle("/query", corsHandler)

	http.Handle("/query", corsHandler)

	log.Printf("connect to http://localhost:%s/ for GraphQL playground", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
