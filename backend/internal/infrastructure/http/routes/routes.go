package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/Murilo-The-Dev/Stelani/backend/internal/application/handlers"
	"github.com/Murilo-The-Dev/Stelani/backend/internal/application/middleware"
	"github.com/Murilo-The-Dev/Stelani/backend/internal/domain/services"
)

func SetupRoutes(
	router *gin.Engine,
	authHandler *handlers.AuthHandler,
	productHandler *handlers.ProductHandler,
	authService *services.AuthService,
) {
	v1 := router.Group("/api/v1")
	
	// Admin auth routes
	auth := v1.Group("/admin/auth")
	{
		auth.POST("/login", authHandler.Login)
	}
	
	// Public product routes
	products := v1.Group("/products")
	{
		products.GET("", productHandler.List)
		products.GET("/:id", productHandler.GetByID)
	}
	
	// Admin routes (protected)
	admin := v1.Group("/admin")
	admin.Use(middlewares.AuthMiddleware(authService))
	{
		// Products management
		adminProducts := admin.Group("/products")
		{
			adminProducts.POST("", productHandler.Create)
			adminProducts.PUT("/:id", productHandler.Update)
			adminProducts.DELETE("/:id", productHandler.Delete)
		}
	}
}