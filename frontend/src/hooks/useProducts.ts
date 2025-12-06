import { useQuery } from '@tanstack/react-query';
import { productService } from '@/services/api/endpoints/products';

export const useProducts = (category?: string) => {
  return useQuery({
    queryKey: ['products', category],
    queryFn: () => productService.getAll(category),
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
};

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => productService.getById(id),
    enabled: !!id,
  });
};