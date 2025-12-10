import { useQuery } from '@tanstack/react-query';
import { statsService } from '@/services/api/endpoints/stats';

export const useStats = () => {
  return useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: () => statsService.getDashboardStats(),
    refetchInterval: 30000, // Atualiza a cada 30s
  });
};