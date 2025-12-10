import api from '../axios.config';

export interface DashboardStats {
  total_products: number;
  recent_products: Array<{
    id: string;
    name: string;
    price: number;
    images: Array<{ image_url: string }>;
    created_at: string;
  }>;
}

export const statsService = {
  async getDashboardStats(): Promise<DashboardStats> {
    const response = await api.get<DashboardStats>('/admin/stats');
    return response.data;
  },
};