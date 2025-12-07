import api from '../axios.config';
import { AuthResponse, LoginRequest, RegisterRequest } from '@/services/api/user.types';

export const authService = {
  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/admin/auth/register', data);
    return response.data;
  },
  
  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/admin/auth/login', data);
    return response.data;
  },
};