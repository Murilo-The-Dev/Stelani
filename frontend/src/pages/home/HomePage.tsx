import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/common/Button';
import ProductCard from '@/components/product/ProductCard';
import { useProducts } from '@/hooks/useProducts';
import { Sparkles } from 'lucide-react';

export default function HomePage() {
  const { data: products, isLoading } = useProducts();
  const featuredProducts = products?.slice(0, 3) || [];

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Header />

{/* Hero Section */}
<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
    <div className="flex flex-col gap-4 sm:gap-6 text-center lg:text-left">
      <div className="space-y-3 sm:space-y-4">
        <div className="inline-block">
          <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-purple-200 to-pink-200 text-purple-700 rounded-full text-xs sm:text-sm font-semibold shadow-sm">
            Artesanal & Exclusivo
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-purple-500 bg-clip-text text-transparent leading-tight">
          Bolsas em Miçangas Feitas com Amor
        </h1>
        <p className="text-base sm:text-lg text-purple-600 max-w-2xl mx-auto lg:mx-0">
          Designs exclusivos e personalizados. Cada peça é única, feita à mão com todo carinho.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
        <Link to="/products" className="w-full sm:w-auto">
          <Button className="w-full sm:w-auto bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white shadow-lg hover:shadow-xl transition-all px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg rounded-full">
            Explorar Coleção
          </Button>
        </Link>
        <Link to="/custom" className="w-full sm:w-auto">
          <Button
            variant="outline"
            className="w-full sm:w-auto border-2 border-purple-300 text-purple-600 hover:bg-purple-50 px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg rounded-full"
          >
            Encomendar Personalizada
          </Button>
        </Link>
      </div>

      {/* Trust badges */}
      <div className="flex gap-4 sm:gap-6 justify-center lg:justify-start mt-2 sm:mt-4">
        <div className="flex items-center gap-2 text-xs sm:text-sm text-purple-600">
          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
          <span className="font-semibold">100% Artesanal</span>
        </div>
        <div className="flex items-center gap-2 text-xs sm:text-sm text-purple-600">
          <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
          <span className="font-semibold">Feito com Amor</span>
        </div>
      </div>
    </div>

    <div className="relative order-first lg:order-last">
      <div className="aspect-square bg-gradient-to-br from-purple-200 via-pink-100 to-purple-100 rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-2xl overflow-hidden animate-float">
        <div className="text-center p-6 sm:p-8">
          <Sparkles className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-auto mb-3 sm:mb-4 text-purple-400 animate-pulse-soft" />
          <p className="text-lg sm:text-xl font-semibold text-purple-600">Sua bolsa ideal aqui!</p>
          <p className="text-xs sm:text-sm text-purple-400 mt-2">Exclusividade garantida</p>
        </div>
      </div>
      {/* Decorative elements - ocultos em mobile */}
      <div className="hidden sm:block absolute -top-4 -right-4 w-24 h-24 bg-pink-300 rounded-full blur-3xl opacity-50 animate-pulse"></div>
      <div className="hidden sm:block absolute -bottom-4 -left-4 w-32 h-32 bg-purple-300 rounded-full blur-3xl opacity-50 animate-pulse"></div>
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