package main

import (
	"log"
	"github.com/gin-gonic/gin"
	"github.com/gin-contrib/cors"
	"github.com/Murilo-The-Dev/Stelani/backend/config"
	"github.com/Murilo-The-Dev/Stelani/backend/internal/infrastructure/database"
	"github.com/Murilo-The-Dev/Stelani/backend/internal/application/handlers"
	"github.com/Murilo-The-Dev/Stelani/backend/internal/infrastructure/http/routes"
	"github.com/Murilo-The-Dev/Stelani/backend/internal/domain/services"
	"github.com/Murilo-The-Dev/Stelani/backend/internal/domain/entities"
)

func main() {
	// Load config
	cfg := config.LoadConfig()
	
	// Connect to database
	db := database.NewPostgresDB(cfg)
	
	// Auto migrate
	db.AutoMigrate(
		&entities.User{},
		&entities.Product{},
		&entities.ProductImage{},
		&entities.Order{},
		&entities.OrderItem{},
	)
	
	log.Println("Database migration completed")
	
	// Initialize repositories
	userRepo := database.NewUserRepository(db)
	
	// Initialize services
	authService := services.NewAuthService(userRepo, cfg.JWTSecret)
	
	// Initialize handlers
	authHandler := handlers.NewAuthHandler(authService)
	
	// Setup Gin
	router := gin.Default()
	
	// CORS
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))
	
	// Setup routes
	routes.SetupRoutes(router, authHandler, authService)
	
	// Start server
	log.Printf("Server starting on port %s", cfg.ServerPort)
	if err := router.Run(":" + cfg.ServerPort); err != nil {
		log.Fatal("Failed to start server:", err)
	}
}