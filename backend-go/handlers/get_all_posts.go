package handlers

import (
	"backend-go/repositories"
	"net/http"
)

// GetAllPosts — GET /api/posts
func GetAllPosts(w http.ResponseWriter, r *http.Request) {
	posts, err := repositories.GetAllPosts()
	if err != nil {
		writeError(w, http.StatusInternalServerError, "Failed to fetch posts")
		return
	}
	writeJSON(w, http.StatusOK, posts)
}
