package services

import (
	"github.com/Murilo-The-Dev/Stelani/backend/internal/domain/entities"
	"github.com/Murilo-The-Dev/Stelani/backend/internal/domain/repositories"
)

type ProductService struct {
	productRepo repositories.ProductRepository
}

func NewProductService(productRepo repositories.ProductRepository) *ProductService {
	return &ProductService{
		productRepo: productRepo,
	}
}

func (s *ProductService) CreateProduct(product *entities.Product) error {
	return s.productRepo.Create(product)
}

func (s *ProductService) GetProduct(id string) (*entities.Product, error) {
	return s.productRepo.FindByID(id)
}

func (s *ProductService) ListProducts(category string) ([]entities.Product, error) {
	return s.productRepo.FindAll(category)
}

func (s *ProductService) UpdateProduct(product *entities.Product) error {
	return s.productRepo.Update(product)
}

func (s *ProductService) DeleteProduct(id string) error {
	return s.productRepo.Delete(id)
}