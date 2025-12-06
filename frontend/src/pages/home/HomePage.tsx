import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/common/Button';
import ProductCard from '@/components/product/ProductCard';
import { useProducts } from '@/hooks/useProducts';

export default function HomePage() {
  const { data: products, isLoading } = useProducts();
  const featuredProducts = products?.slice(0, 3) || [];

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-6">
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl font-light text-foreground">
                Bolsas Artesanais em Miçangas
              </h1>
              <p className="text-lg text-muted-foreground">
                Designs exclusivos e personalizados. Cada peça é única e feita com cuidado.
              </p>
            </div>

            <div className="flex gap-4 flex-wrap">
              <Link to="/products">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  Explorar Coleção
                </Button>
              </Link>
              <Link to="/custom">
                <Button variant="outline" className="border-primary text-primary">
                  Encomendar Personalizada
                </Button>
              </Link>
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg aspect-square flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-2">🎨</div>
              <p className="text-muted-foreground">Sua bolsa ideal aqui</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-light text-foreground">Destaques</h2>
            <Link to="/products">
              <Button variant="outline">Ver Todos</Button>
            </Link>
          </div>

          {isLoading ? (
            <div className="text-center py-12 text-muted-foreground">
              Carregando produtos...
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}