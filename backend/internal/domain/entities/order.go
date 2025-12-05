package entities

import (
	"time"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type OrderStatus string

const (
	StatusAguardandoPagamento OrderStatus = "aguardando_pagamento"
	StatusPago                OrderStatus = "pago"
	StatusEmProducao          OrderStatus = "em_producao"
	StatusPronto              OrderStatus = "pronto"
	StatusEnviado             OrderStatus = "enviado"
	StatusEntregue            OrderStatus = "entregue"
	StatusCancelado           OrderStatus = "cancelado"
)

type Order struct {
	ID              uuid.UUID   `gorm:"type:uuid;primary_key"`
	UserID          uuid.UUID   `gorm:"type:uuid;not null"`
	User            User        `gorm:"foreignKey:UserID"`
	Status          OrderStatus `gorm:"type:varchar(30);not null"`
	TotalAmount     float64     `gorm:"not null"`
	DeliveryAddress string      `gorm:"type:text"`
	Notes           string      `gorm:"type:text"`
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