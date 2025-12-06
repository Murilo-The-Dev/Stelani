import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { authService } from '@/services/api/endpoints/auth';
import { useAuthStore } from '@/store/authStore';
import { LoginRequest, RegisterRequest } from '@/services/api/user.types';

export const useAuth = () => {
  const navigate = useNavigate();
  const { login: setAuth, logout: clearAuth } = useAuthStore();
  
  const loginMutation = useMutation({
    mutationFn: (data: LoginRequest) => authService.login(data),
    onSuccess: (response) => {
      setAuth(response.token, response.user);
      navigate('/');
    },
  });
  
  const registerMutation = useMutation({
    mutationFn: (data: RegisterRequest) => authService.register(data),
    onSuccess: (response) => {
      setAuth(response.token, response.user);
      navigate('/');
    },
  });
  
  const logout = () => {
    clearAuth();
    navigate('/login');
  };
  
  return {
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    logout,
    isLoggingIn: loginMutation.isPending,
    isRegistering: registerMutation.isPending,
    loginError: loginMutation.error,
  };
};