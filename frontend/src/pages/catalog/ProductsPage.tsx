import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/product/ProductCard';
import Button from '@/components/common/Button';
import { useProducts } from '@/hooks/useProducts';
import SEO from '@/components/common/SEO';

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const { data: products, isLoading } = useProducts(selectedCategory);

  return (
    <>
      <SEO 
        title="Produtos - Bolsas Artesanais"
        description="Explore nossa coleção completa de bolsas artesanais em miçangas. Designs exclusivos para adultos e crianças."
      />
    <main className="lilas min-h-screen bg-background flex flex-col">
      <Header />

      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-4xl font-light text-foreground">Todos os Produtos</h1>
            <p className="text-muted-foreground">
              Explore nossa coleção completa de bolsas artesanais em miçangas
            </p>
          </div>

          {/* Filters */}
          <div className="flex gap-3 flex-wrap">
            {[
              { value: 'todos', label: 'Todos' },
              { value: 'adulto', label: 'Adulto' },
              { value: 'infantil', label: 'Infantil' },
            ].map((filter) => (
              <Button
                key={filter.value}
                onClick={() => setSelectedCategory(filter.value)}
                variant={selectedCategory === filter.value ? 'default' : 'outline'}
              >
                {filter.label}
              </Button>
            ))}
          </div>

          {/* Products Grid */}
          {isLoading ? (
            <div className="text-center py-12 text-muted-foreground">
              Carregando produtos...
            </div>
          ) : products && products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              Nenhum produto encontrado nesta categoria
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
    </>
  );
}