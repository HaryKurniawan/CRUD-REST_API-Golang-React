package handlers

import (
	"backend-go/repositories"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
)

// DeletePost — DELETE /api/posts/{id}
func DeletePost(w http.ResponseWriter, r *http.Request) {
	id, err := strconv.Atoi(mux.Vars(r)["id"])
	if err != nil {
		writeError(w, http.StatusBadRequest, "Invalid post ID")
		return
	}

	deleted, err := repositories.DeletePost(id)
	if err != nil {
		writeError(w, http.StatusInternalServerError, "Failed to delete post")
		return
	}
	if !deleted {
		writeError(w, http.StatusNotFound, "Post not found")
		return
	}
	writeJSON(w, http.StatusOK, map[string]string{"message": "Post deleted successfully"})
}
