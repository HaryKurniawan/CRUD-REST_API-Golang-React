package routes

import (
	"backend-go/handlers"
	"net/http"

	"github.com/gorilla/mux"
)

func SetupRoutes() *mux.Router {
	r := mux.NewRouter()

	// CORS middleware
	r.Use(corsMiddleware)

	// API prefix
	api := r.PathPrefix("/api").Subrouter()

	// Posts routes
	api.HandleFunc("/posts", handlers.GetAllPosts).Methods(http.MethodGet)
	api.HandleFunc("/posts/{id}", handlers.GetPostByID).Methods(http.MethodGet)
	api.HandleFunc("/posts", handlers.CreatePost).Methods(http.MethodPost)
	api.HandleFunc("/posts/{id}", handlers.UpdatePost).Methods(http.MethodPut)
	api.HandleFunc("/posts/{id}", handlers.DeletePost).Methods(http.MethodDelete)

	// OPTIONS preflight untuk semua routes
	api.PathPrefix("/").HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
	}).Methods(http.MethodOptions)

	return r
}

func corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}
		next.ServeHTTP(w, r)
	})
}
