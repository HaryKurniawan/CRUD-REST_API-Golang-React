package handlers

import (
	"backend-go/models"
	"backend-go/repositories"
	"encoding/json"
	"net/http"
)

// CreatePost — POST /api/posts
func CreatePost(w http.ResponseWriter, r *http.Request) {
	var req models.CreatePostRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeError(w, http.StatusBadRequest, "Invalid request body")
		return
	}
	if req.Title == "" || req.Content == "" {
		writeError(w, http.StatusBadRequest, "Title and content are required")
		return
	}

	post, err := repositories.CreatePost(req)
	if err != nil {
		writeError(w, http.StatusInternalServerError, "Failed to create post")
		return
	}
	writeJSON(w, http.StatusCreated, post)
}
