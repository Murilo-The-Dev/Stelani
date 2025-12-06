package entities

import (
	"time"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type OrderStatus string

const (
	StatusPendente  OrderStatus = "pendente"    // Aguardando contato via WhatsApp
	StatusConfirmado OrderStatus = "confirmado" // Admin confirmou via WhatsApp
	StatusEmProducao OrderStatus = "em_producao"
	StatusPronto     OrderStatus = "pronto"
	StatusEntregue   OrderStatus = "entregue"
	StatusCancelado  OrderStatus = "cancelado"
)

type Order struct {
	ID              uuid.UUID   `gorm:"type:uuid;primary_key"`
	CustomerName    string      `gorm:"not null"`           // Nome do cliente
	CustomerPhone   string      `gorm:"not null"`           // Telefone
	CustomerAddress string      `gorm:"type:text"`          // Endereço
	Status          OrderStatus `gorm:"type:varchar(30);not null;default:'pendente'"`
	TotalAmount     float64     `gorm:"not null"`
	Notes           string      `gorm:"type:text"`          // Observações do cliente
	Items           []OrderItem `gorm:"foreignKey:OrderID"`
	CreatedAt       time.Time
	UpdatedAt       time.Time
}

func (o *Order) BeforeCreate(tx *gorm.DB) error {
	o.ID = uuid.New()
	return nil
}

type OrderItem struct {
	ID        uuid.UUID `gorm:"type:uuid;primary_key"`
	OrderID   uuid.UUID `gorm:"type:uuid;not null"`
	ProductID uuid.UUID `gorm:"type:uuid;not null"`
	Product   Product   `gorm:"foreignKey:ProductID"`
	Quantity  int       `gorm:"not null"`
	UnitPrice float64   `gorm:"not null"`
	Subtotal  float64   `gorm:"not null"`
	CreatedAt time.Time
}

func (oi *OrderItem) BeforeCreate(tx *gorm.DB) error {
	oi.ID = uuid.New()
	return nil
}