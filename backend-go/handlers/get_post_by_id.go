package handlers

import (
	"backend-go/repositories"
	"errors"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
	"gorm.io/gorm"
)

// GetPostByID — GET /api/posts/{id}
func GetPostByID(w http.ResponseWriter, r *http.Request) {
	id, err := strconv.Atoi(mux.Vars(r)["id"])
	if err != nil {
		writeError(w, http.StatusBadRequest, "Invalid post ID")
		return
	}

	post, err := repositories.GetPostByID(id)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			writeError(w, http.StatusNotFound, "Post not found")
			return
		}
		writeError(w, http.StatusInternalServerError, "Failed to fetch post")
		return
	}
	writeJSON(w, http.StatusOK, post)
}
