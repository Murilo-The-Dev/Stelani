package dto

import (
	"github.com/Murilo-The-Dev/Stelani/backend/internal/domain/entities"
)

type CreateProductRequest struct {
	Name               string   `json:"name" binding:"required"`
	Description        string   `json:"description"`
	Category           string   `json:"category" binding:"required,oneof=infantil adulto"`
	Format             string   `json:"format"`
	Height             float64  `json:"height"`
	Width              float64  `json:"width"`
	Depth              float64  `json:"depth"`
	ProductionTimeDays int      `json:"production_time_days"`
	Price              float64  `json:"price" binding:"required,gt=0"`
	ImageURLs          []string `json:"image_urls"`
}

type UpdateProductRequest struct {
	Name               string   `json:"name"`
	Description        string   `json:"description"`
	Category           string   `json:"category"`
	Format             string   `json:"format"`
	Height             float64  `json:"height"`
	Width              float64  `json:"width"`
	Depth              float64  `json:"depth"`
	ProductionTimeDays int      `json:"production_time_days"`
	Price              float64  `json:"price"`
	ImageURLs          []string `json:"image_urls"`
}

type ProductResponse struct {
	ID                 string               `json:"id"`
	Name               string               `json:"name"`
	Description        string               `json:"description"`
	Category           string               `json:"category"`
	Format             string               `json:"format"`
	Height             float64              `json:"height"`
	Width              float64              `json:"width"`
	Depth              float64              `json:"depth"`
	ProductionTimeDays int                  `json:"production_time_days"`
	Price              float64              `json:"price"`
	Images             []ProductImageResponse `json:"images"`
	CreatedAt          string               `json:"created_at"`
}

type ProductImageResponse struct {
	ID           string `json:"id"`
	ImageURL     string `json:"image_url"`
	DisplayOrder int    `json:"display_order"`
}

func ToProductResponse(product *entities.Product) *ProductResponse {
	images := make([]ProductImageResponse, len(product.Images))
	for i, img := range product.Images {
		images[i] = ProductImageResponse{
			ID:           img.ID.String(),
			ImageURL:     img.ImageURL,
			DisplayOrder: img.DisplayOrder,
		}
	}
	
	return &ProductResponse{
		ID:                 product.ID.String(),
		Name:               product.Name,
		Description:        product.Description,
		Category:           string(product.Category),
		Format:             product.Format,
		Height:             product.Height,
		Width:              product.Width,
		Depth:              product.Depth,
		ProductionTimeDays: product.ProductionTimeDays,
		Price:              product.Price,
		Images:             images,
		CreatedAt:          product.CreatedAt.Format("2006-01-02"),
	}
}