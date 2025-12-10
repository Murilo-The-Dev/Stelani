package dto

type DashboardStats struct {
	TotalProducts int     `json:"total_products"`
	TotalOrders   int     `json:"total_orders"`
	TotalRevenue  float64 `json:"total_revenue"`
	RecentProducts []ProductResponse `json:"recent_products"`
}