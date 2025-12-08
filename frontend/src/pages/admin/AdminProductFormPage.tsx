import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Button from '@/components/common/Button';
import { useProduct } from '@/hooks/useProducts';
import { productService } from '@/services/api/endpoints/products';
import { ArrowLeft } from 'lucide-react';
import ImageUpload from '@/components/common/ImageUpload';

export default function AdminProductFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isEdit = !!id;

  const { data: product } = useProduct(id!);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'adulto' as 'adulto' | 'infantil',
    format: '',
    height: '',
    width: '',
    depth: '',
    production_time_days: '',
    price: '',
    image_urls: [] as string[],
  });

  useEffect(() => {
    if (product && isEdit) {
      setFormData({
        name: product.name,
        description: product.description,
        category: product.category,
        format: product.format || '',
        height: product.height?.toString() || '',
        width: product.width?.toString() || '',
        depth: product.depth?.toString() || '',
        production_time_days: product.production_time_days?.toString() || '',
        price: product.price.toString(),
        image_urls: product.images.map((img) => img.image_url),
      });
    }
  }, [product, isEdit]);

  const createMutation = useMutation({
    mutationFn: (data: any) => productService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      navigate('/admin/products');
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: any) => productService.update(id!, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['product', id] });
      navigate('/admin/products');
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      name: formData.name,
      description: formData.description,
      category: formData.category,
      format: formData.format,
      height: formData.height ? parseFloat(formData.height) : undefined,
      width: formData.width ? parseFloat(formData.width) : undefined,
      depth: formData.depth ? parseFloat(formData.depth) : undefined,
      production_time_days: formData.production_time_days
        ? parseInt(formData.production_time_days)
        : undefined,
      price: parseFloat(formData.price),
      image_urls: formData.image_urls.filter((url) => url.trim() !== ''),
    };

    if (isEdit) {
      updateMutation.mutate(payload);
    } else {
      createMutation.mutate(payload);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Link to="/admin/products">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">
              {isEdit ? 'Editar Produto' : 'Novo Produto'}
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow p-6 space-y-6"
        >
          {/* Basic Info */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Informações Básicas
            </h2>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Nome do Produto *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Ex: Bolsa Rosa Pálido"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Descrição
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                placeholder="Descrição do produto"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Categoria *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="adulto">Adulto</option>
                  <option value="infantil">Infantil</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Formato
                </label>
                <input
                  type="text"
                  name="format"
                  value={formData.format}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Ex: Retangular, Circular"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Preço (R$) *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                step="0.01"
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="89.90"
              />
            </div>
          </div>

          {/* Dimensions */}
          <div className="space-y-4 border-t border-gray-200 pt-6">
            <h2 className="text-lg font-semibold text-gray-900">Dimensões</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Altura (cm)
                </label>
                <input
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  step="0.1"
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Largura (cm)
                </label>
                <input
                  type="number"
                  name="width"
                  value={formData.width}
                  onChange={handleChange}
                  step="0.1"
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Profundidade (cm)
                </label>
                <input
                  type="number"
                  name="depth"
                  value={formData.depth}
                  onChange={handleChange}
                  step="0.1"
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Tempo de Produção (dias)
              </label>
              <input
                type="number"
                name="production_time_days"
                value={formData.production_time_days}
                onChange={handleChange}
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="7"
              />
            </div>
          </div>

          {/* Images */}
          <div className="space-y-4 border-t border-gray-200 pt-6">
            <h2 className="text-lg font-semibold text-gray-900">Imagens</h2>
  
            <ImageUpload
            images={formData.image_urls}
            onImagesChange={(images) => 
            setFormData((prev) => ({ ...prev, image_urls: images }))
            }
          maxImages={6}
          />
          </div>

          {/* Submit */}
          <div className="flex gap-3 border-t border-gray-200 pt-6">
            <Button
              type="submit"
              disabled={createMutation.isPending || updateMutation.isPending}
              className="flex-1"
            >
              {createMutation.isPending || updateMutation.isPending
                ? 'Salvando...'
                : isEdit
                ? 'Atualizar Produto'
                : 'Criar Produto'}
            </Button>
            <Link to="/admin/products" className="flex-1">
              <Button type="button" variant="outline" className="w-full">
                Cancelar
              </Button>
            </Link>
          </div>
        </form>
      </main>
    </div>
  );
}