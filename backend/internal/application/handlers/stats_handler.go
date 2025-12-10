package handlers

import (
	"net/http"
	"github.com/gin-gonic/gin"
	"github.com/Murilo-The-Dev/Stelani/backend/internal/domain/services"
)

type StatsHandler struct {
	statsService *services.StatsService
}

func NewStatsHandler(statsService *services.StatsService) *StatsHandler {
	return &StatsHandler{statsService: statsService}
}

func (h *StatsHandler) GetDashboardStats(c *gin.Context) {
	stats, err := h.statsService.GetDashboardStats()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to get stats"})
		return
	}
	
	c.JSON(http.StatusOK, stats)
}