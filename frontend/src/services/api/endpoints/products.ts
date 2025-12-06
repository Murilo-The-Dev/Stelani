import api from '../axios.config';

export interface Product {
  id: string;
  name: string;
  description: string;
  category: 'infantil' | 'adulto';
  format?: string;
  height?: number;
  width?: number;
  depth?: number;
  production_time_days?: number;
  price: number;
  images: Array<{
    id: string;
    image_url: string;
    display_order: number;
  }>;
  created_at: string;
}

export const productService = {
  async getAll(category?: string): Promise<Product[]> {
    const params = category && category !== 'todos' ? { category } : {};
    const response = await api.get<Product[]>('/products', { params });
    return response.data;
  },

  async getById(id: string): Promise<Product> {
    const response = await api.get<Product>(`/products/${id}`);
    return response.data;
  },

  // Admin endpoints
  async create(product: Partial<Product>): Promise<Product> {
    const response = await api.post<Product>('/admin/products', product);
    return response.data;
  },

  async update(id: string, product: Partial<Product>): Promise<Product> {
    const response = await api.put<Product>(`/admin/products/${id}`, product);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/admin/products/${id}`);
  },
};