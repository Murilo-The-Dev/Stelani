package services

import (
	"github.com/Murilo-The-Dev/Stelani/backend/internal/domain/repositories"
)

type StatsService struct {
	productRepo repositories.ProductRepository
}

func NewStatsService(productRepo repositories.ProductRepository) *StatsService {
	return &StatsService{
		productRepo: productRepo,
	}
}

func (s *StatsService) GetDashboardStats() (map[string]interface{}, error) {
	products, err := s.productRepo.FindAll("")
	if err != nil {
		return nil, err
	}

	totalProducts := len(products)
	
	// Pegar últimos 5 produtos
	recentCount := 5
	if totalProducts < recentCount {
		recentCount = totalProducts
	}
	recentProducts := products[:recentCount]

	return map[string]interface{}{
		"total_products":  totalProducts,
		"recent_products": recentProducts,
	}, nil
}