package repositories

import (
	"github.com/Murilo-The-Dev/Stelani/backend/internal/domain/entities"
)

type UserRepository interface {
	Create(user *entities.User) error
	FindByID(id string) (*entities.User, error)
	FindByEmail(email string) (*entities.User, error)
	Update(user *entities.User) error
}