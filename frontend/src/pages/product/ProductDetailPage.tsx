import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/common/Button';
import { useProduct } from '@/hooks/useProducts';
import { useCartStore } from '@/store/cartStore';
import { ChevronLeft } from 'lucide-react';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading } = useProduct(id!);
  const [selectedImage, setSelectedImage] = useState(0);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    if (product) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0]?.image_url || '/placeholder.jpg',
      });
    }
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Carregando...</p>
        </div>
        <Footer />
      </main>
    );
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-background flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Produto não encontrado</p>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="lilas min-h-screen bg-background flex flex-col">
      <Header />

      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
  <Link
    to="/products"
    className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 sm:mb-8 text-sm sm:text-base"
  >
    <ChevronLeft className="w-4 h-4" />
    Voltar para produtos
  </Link>

  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
    {/* Images */}
    <div className="space-y-4">
      <div className="aspect-square bg-muted rounded-lg sm:rounded-xl overflow-hidden">
        <img
          src={product.images[selectedImage]?.image_url || '/placeholder.jpg'}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      {product.images.length > 1 && (
        <div className="grid grid-cols-4 gap-2 sm:gap-3">
          {product.images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => setSelectedImage(index)}
              className={`aspect-square bg-muted rounded-lg overflow-hidden border-2 transition-all ${
                selectedImage === index
                  ? 'border-primary scale-95'
                  : 'border-transparent hover:border-primary/50'
              }`}
            >
              <img
                src={image.image_url}
                alt={`${product.name} ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>

    {/* Details */}
    <div className="space-y-4 sm:space-y-6">
      <div>
        <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs sm:text-sm rounded-full mb-3 font-semibold">
          {product.category === 'infantil' ? 'Infantil' : 'Adulto'}
        </span>
        <h1 className="text-3xl sm:text-4xl font-light text-foreground mb-3">
          {product.name}
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          {product.description}
        </p>
      </div>

      <div className="text-2xl sm:text-3xl font-light text-primary">
        R$ {product.price.toFixed(2)}
      </div>

      {product.production_time_days && (
        <div className="bg-muted rounded-lg p-3 sm:p-4">
          <p className="text-xs sm:text-sm text-muted-foreground">
            ⏱️ Tempo de produção:{' '}
            <strong className="text-foreground">
              {product.production_time_days} dias úteis
            </strong>
          </p>
        </div>
      )}

      {(product.height || product.width) && (
        <div className="space-y-2">
          <h3 className="font-semibold text-foreground text-sm sm:text-base">
            Dimensões
          </h3>
          <div className="text-xs sm:text-sm text-muted-foreground space-y-1">
            {product.height && <p>Altura: {product.height}cm</p>}
            {product.width && <p>Largura: {product.width}cm</p>}
            {product.depth && <p>Profundidade: {product.depth}cm</p>}
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <Button
          onClick={handleAddToCart}
          className="flex-1 py-5 sm:py-6 text-base sm:text-lg rounded-full"
        >
          Adicionar ao Carrinho
        </Button>
        <Link to="/custom" className="flex-1">
          <Button
            variant="outline"
            className="w-full py-5 sm:py-6 text-base sm:text-lg rounded-full"
          >
            Personalizar Similar
          </Button>
        </Link>
      </div>
    </div>
  </div>
</div>

      <Footer />
    </main>
  );
}