package repositories

import (
	"github.com/Murilo-The-Dev/Stelani/backend/internal/domain/entities"
)

type ProductRepository interface {
	Create(product *entities.Product) error
	FindByID(id string) (*entities.Product, error)
	FindAll(category string) ([]entities.Product, error)
	Update(product *entities.Product) error
	Delete(id string) error
}