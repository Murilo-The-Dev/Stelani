package main

import (
	"log"
	"os"

	"github.com/Murilo-The-Dev/Stelani/backend/config"
	"github.com/Murilo-The-Dev/Stelani/backend/internal/application/handlers"
	"github.com/Murilo-The-Dev/Stelani/backend/internal/domain/entities"
	"github.com/Murilo-The-Dev/Stelani/backend/internal/domain/services"
	"github.com/Murilo-The-Dev/Stelani/backend/internal/infrastructure/database"
	"github.com/Murilo-The-Dev/Stelani/backend/internal/infrastructure/http/routes"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
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
		&entities.CustomOrder{},
	)

	log.Println("Database migration completed")

	// Initialize repositories
	userRepo := database.NewUserRepository(db)
	productRepo := database.NewProductRepository(db)

	// Initialize services
	authService := services.NewAuthService(userRepo, cfg.JWTSecret)
	productService := services.NewProductService(productRepo)
	statsService := services.NewStatsService(productRepo)

	// Initialize handlers
	authHandler := handlers.NewAuthHandler(authService)
	productHandler := handlers.NewProductHandler(productService)
	statsHandler := handlers.NewStatsHandler(statsService)

	// Setup Gin
	router := gin.Default()

	// CORS
	allowedOrigins := []string{"http://localhost:5173"}
	if productionURL := os.Getenv("FRONTEND_URL"); productionURL != "" {
		allowedOrigins = append(allowedOrigins, productionURL)
	}

	router.Use(cors.New(cors.Config{
		AllowOrigins:     allowedOrigins,
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	// Setup routes
	routes.SetupRoutes(router, authHandler, productHandler, statsHandler, authService)

	// Start server
	log.Printf("Server starting on port %s", cfg.ServerPort)
	log.Printf("WhatsApp configured: %s", cfg.WhatsAppNumber)
	if err := router.Run(":" + cfg.ServerPort); err != nil {
		log.Fatal("Failed to start server:", err)
	}
}
