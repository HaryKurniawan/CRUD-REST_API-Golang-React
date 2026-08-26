package main

import (
	"backend-go/config"
	"backend-go/models"
	"backend-go/routes"
	"log"
	"net/http"
	"os"

	"github.com/joho/godotenv"
)

func main() {
	// Load .env
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found, using system environment variables")
	}

	// Connect ke database via GORM
	config.ConnectDatabase()

	// AutoMigrate — mirip "prisma migrate dev" di JS
	// GORM otomatis buat/update tabel sesuai struct model
	if err := config.DB.AutoMigrate(&models.Post{}); err != nil {
		log.Fatal("❌ AutoMigrate failed:", err)
	}
	log.Println("✅ AutoMigrate completed")

	// Setup routes
	router := routes.SetupRoutes()

	// Start server
	port := os.Getenv("PORT")
	if port == "" {
		port = "8081"
	}

	log.Printf("🚀 Server running on http://localhost:%s", port)
	if err := http.ListenAndServe(":"+port, router); err != nil {
		log.Fatal("Failed to start server:", err)
	}
}
