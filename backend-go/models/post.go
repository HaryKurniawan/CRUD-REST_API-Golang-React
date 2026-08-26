package models

import "time"

// Post adalah model GORM — mirip model Prisma di schema.prisma
// GORM otomatis mapping ke tabel "posts" (lowercase + plural dari "Post")
type Post struct {
	ID        uint      `json:"id"         gorm:"primaryKey;autoIncrement"`
	Title     string    `json:"title"      gorm:"not null"`
	Content   string    `json:"content"    gorm:"not null"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

// DTO untuk request body (tidak disimpan ke DB)
type CreatePostRequest struct {
	Title   string `json:"title"`
	Content string `json:"content"`
}

type UpdatePostRequest struct {
	Title   string `json:"title"`
	Content string `json:"content"`
}
