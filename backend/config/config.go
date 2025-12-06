package config

import (
	"os"
	"github.com/joho/godotenv"
)

type Config struct {
	DBHost       string
	DBPort       string
	DBUser       string
	DBPassword   string
	DBName       string
	JWTSecret    string
	ServerPort   string
	WhatsAppNumber string // NOVO
}

func LoadConfig() *Config {
	godotenv.Load()
	
	return &Config{
		DBHost:         getEnv("DB_HOST", "localhost"),
		DBPort:         getEnv("DB_PORT", "5432"),
		DBUser:         getEnv("DB_USER", "postgres"),
		DBPassword:     getEnv("DB_PASSWORD", ""),
		DBName:         getEnv("DB_NAME", "stelani"),
		JWTSecret:      getEnv("JWT_SECRET", ""),
		ServerPort:     getEnv("SERVER_PORT", "8080"),
		WhatsAppNumber: getEnv("WHATSAPP_NUMBER", ""),
	}
}

func getEnv(key, fallback string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return fallback
}