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
	authService *services.AuthService,
) {
	v1 := router.Group("/api/v1")
	
	// Public routes
	auth := v1.Group("/auth")
	{
		auth.POST("/register", authHandler.Register)
		auth.POST("/login", authHandler.Login)
	}
	
	// Protected routes (adicionar depois)
	protected := v1.Group("")
	protected.Use(middlewares.AuthMiddleware(authService))
	{
		// Cart, orders, etc (fase 2)
	}
	
	// Admin routes (adicionar depois)
	admin := v1.Group("/admin")
	admin.Use(middlewares.AuthMiddleware(authService))
	admin.Use(middlewares.AdminOnly())
	{
		// Products CRUD (fase 2)
	}
}