package handlers

import (
	"net/http"
	"github.com/gin-gonic/gin"
	"github.com/Murilo-The-Dev/Stelani/backend/internal/domain/services"
	"github.com/Murilo-The-Dev/Stelani/backend/internal/domain/entities"
	"github.com/Murilo-The-Dev/Stelani/backend/internal/application/dto"
)

type ProductHandler struct {
	productService *services.ProductService
}

func NewProductHandler(productService *services.ProductService) *ProductHandler {
	return &ProductHandler{productService: productService}
}

// Public endpoint - listar produtos
func (h *ProductHandler) List(c *gin.Context) {
	category := c.Query("category")
	
	products, err := h.productService.ListProducts(category)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to fetch products"})
		return
	}
	
	response := make([]*dto.ProductResponse, len(products))
	for i, p := range products {
		response[i] = dto.ToProductResponse(&p)
	}
	
	c.JSON(http.StatusOK, response)
}

// Public endpoint - obter produto por ID
func (h *ProductHandler) GetByID(c *gin.Context) {
	id := c.Param("id")
	
	product, err := h.productService.GetProduct(id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "product not found"})
		return
	}
	
	c.JSON(http.StatusOK, dto.ToProductResponse(product))
}

// Admin only - criar produto
func (h *ProductHandler) Create(c *gin.Context) {
	var req dto.CreateProductRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	
	product := &entities.Product{
		Name:               req.Name,
		Description:        req.Description,
		Category:           entities.ProductCategory(req.Category),
		Format:             req.Format,
		Height:             req.Height,
		Width:              req.Width,
		Depth:              req.Depth,
		ProductionTimeDays: req.ProductionTimeDays,
		Price:              req.Price,
		IsActive:           true,
	}
	
	// Adicionar imagens
	for i, url := range req.ImageURLs {
		product.Images = append(product.Images, entities.ProductImage{
			ImageURL:     url,
			DisplayOrder: i,
		})
	}
	
	if err := h.productService.CreateProduct(product); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to create product"})
		return
	}
	
	c.JSON(http.StatusCreated, dto.ToProductResponse(product))
}

// Admin only - atualizar produto
func (h *ProductHandler) Update(c *gin.Context) {
	id := c.Param("id")
	
	product, err := h.productService.GetProduct(id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "product not found"})
		return
	}
	
	var req dto.UpdateProductRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	
	// Atualizar campos básicos
	if req.Name != "" {
		product.Name = req.Name
	}
	if req.Description != "" {
		product.Description = req.Description
	}
	if req.Category != "" {
		product.Category = entities.ProductCategory(req.Category)
	}
	if req.Format != "" {
		product.Format = req.Format
	}
	if req.Height != nil {
		product.Height = *req.Height
	}
	if req.Width != nil {
		product.Width = *req.Width
	}
	if req.Depth != nil {
		product.Depth = *req.Depth
	}
	if req.ProductionTimeDays != nil {
		product.ProductionTimeDays = *req.ProductionTimeDays
	}
	if req.Price > 0 {
		product.Price = req.Price
	}
	
	// CRÍTICO: Atualizar imagens
	if req.ImageURLs != nil {
	// Não limpa aqui - deixa o repository fazer isso na transação
	newImages := []entities.ProductImage{}
	for i, url := range req.ImageURLs {
		newImages = append(newImages, entities.ProductImage{
			ImageURL:     url,
			DisplayOrder: i,
			ProductID:    product.ID,
		})
	}
	product.Images = newImages
}
	
	if err := h.productService.UpdateProduct(product); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to update product"})
		return
	}
	
	c.JSON(http.StatusOK, dto.ToProductResponse(product))
}

// Admin only - deletar produto
func (h *ProductHandler) Delete(c *gin.Context) {
	id := c.Param("id")
	
	if err := h.productService.DeleteProduct(id); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to delete product"})
		return
	}
	
	c.JSON(http.StatusOK, gin.H{"message": "product deleted successfully"})
}