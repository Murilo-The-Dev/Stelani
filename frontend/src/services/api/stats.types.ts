export interface DashboardStats {
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
  lowStockProducts: number;
  recentProducts: Array<{
    id: string;
    name: string;
    price: number;
    createdAt: string;
  }>;
}