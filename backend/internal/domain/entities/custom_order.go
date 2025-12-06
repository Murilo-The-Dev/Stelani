package entities

import (
	"time"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type CustomOrderStatus string

const (
	CustomStatusPendente   CustomOrderStatus = "pendente"
	CustomStatusAnalisando CustomOrderStatus = "analisando"
	CustomStatusAprovado   CustomOrderStatus = "aprovado"
	CustomStatusRecusado   CustomOrderStatus = "recusado"
	CustomStatusEmProducao CustomOrderStatus = "em_producao"
	CustomStatusConcluido  CustomOrderStatus = "concluido"
)

type CustomOrder struct {
	ID              uuid.UUID         `gorm:"type:uuid;primary_key"`
	CustomerName    string            `gorm:"not null"`
	CustomerEmail   string            `gorm:"not null"`
	CustomerPhone   string            `gorm:"not null"`
	Colors          string            `gorm:"not null"`      // Cores desejadas
	Size            string            `gorm:"not null"`      // pequeno, medio, grande
	Quantity        int               `gorm:"not null"`
	Description     string            `gorm:"type:text"`     // Descrição detalhada
	Status          CustomOrderStatus `gorm:"type:varchar(30);not null;default:'pendente'"`
	EstimatedPrice  float64           // Preço estimado pelo admin
	AdminNotes      string            `gorm:"type:text"`     // Notas do admin
	CreatedAt       time.Time
	UpdatedAt       time.Time
}

func (co *CustomOrder) BeforeCreate(tx *gorm.DB) error {
	co.ID = uuid.New()
	return nil
}