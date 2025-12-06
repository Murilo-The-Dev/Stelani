package database

import (
	"gorm.io/gorm"
	"github.com/Murilo-The-Dev/Stelani/backend/internal/domain/entities"
)

type ProductRepositoryImpl struct {
	db *gorm.DB
}

func NewProductRepository(db *gorm.DB) *ProductRepositoryImpl {
	return &ProductRepositoryImpl{db: db}
}

func (r *ProductRepositoryImpl) Create(product *entities.Product) error {
	return r.db.Create(product).Error
}

func (r *ProductRepositoryImpl) FindByID(id string) (*entities.Product, error) {
	var product entities.Product
	if err := r.db.Preload("Images").Where("id = ? AND is_active = ?", id, true).First(&product).Error; err != nil {
		return nil, err
	}
	return &product, nil
}

func (r *ProductRepositoryImpl) FindAll(category string) ([]entities.Product, error) {
	var products []entities.Product
	query := r.db.Preload("Images").Where("is_active = ?", true)
	
	if category != "" && category != "todos" {
		query = query.Where("category = ?", category)
	}
	
	if err := query.Order("created_at DESC").Find(&products).Error; err != nil {
		return nil, err
	}
	return products, nil
}

func (r *ProductRepositoryImpl) Update(product *entities.Product) error {
	return r.db.Save(product).Error
}

func (r *ProductRepositoryImpl) Delete(id string) error {
	// Soft delete - apenas marca como inativo
	return r.db.Model(&entities.Product{}).Where("id = ?", id).Update("is_active", false).Error
}