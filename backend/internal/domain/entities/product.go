package entities

import (
	"time"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type ProductCategory string

const (
	CategoryInfantil ProductCategory = "infantil"
	CategoryAdulto   ProductCategory = "adulto"
)

type Product struct {
	ID                 uuid.UUID       `gorm:"type:uuid;primary_key"`
	Name               string          `gorm:"not null"`
	Description        string          `gorm:"type:text"`
	Category           ProductCategory `gorm:"type:varchar(20);not null"`
	Format             string
	Height             float64
	Width              float64
	Depth              float64
	ProductionTimeDays int
	Price              float64         `gorm:"not null"`
	IsActive           bool            `gorm:"default:true"`
	Images             []ProductImage  `gorm:"foreignKey:ProductID"`
	CreatedAt          time.Time
	UpdatedAt          time.Time
}

func (p *Product) BeforeCreate(tx *gorm.DB) error {
	p.ID = uuid.New()
	return nil
}

type ProductImage struct {
	ID           uuid.UUID `gorm:"type:uuid;primary_key"`
	ProductID    uuid.UUID `gorm:"type:uuid;not null"`
	ImageURL     string    `gorm:"not null"`
	DisplayOrder int       `gorm:"default:0"`
	CreatedAt    time.Time
}

func (pi *ProductImage) BeforeCreate(tx *gorm.DB) error {
	pi.ID = uuid.New()
	return nil
}