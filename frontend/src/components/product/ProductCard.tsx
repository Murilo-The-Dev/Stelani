import { Link } from 'react-router-dom';
import Button from '@/components/common/Button';
import { Product } from '@/services/api/endpoints/products';
import { useCartStore } from '@/store/cartStore';
import { ShoppingCart } from 'lucide-react';
import { optimizeCloudinaryUrl } from '@/utils/cloudinary';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0]?.image_url || '/placeholder.jpg',
    });
  };

  return (
    <Link to={`/products/${product.id}`}>
      <div className="group flex flex-col gap-3 sm:gap-4 h-full">
        {/* Image Container */}
        <div className="relative aspect-square bg-muted rounded-lg sm:rounded-xl overflow-hidden">
          <img
  src={optimizeCloudinaryUrl(product.images[0]?.image_url || '/placeholder.jpg')}
  alt={product.name}
  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
  loading="lazy"
/>
          
          {/* Quick add button - apenas desktop */}
          <div className="hidden sm:block absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="absolute bottom-4 left-4 right-4">
              <Button
                onClick={handleAddToCart}
                className="w-full bg-white text-purple-600 hover:bg-purple-50"
                size="sm"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Adicionar
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-2 sm:gap-3 flex-1">
          <div>
            <h3 className="font-semibold text-foreground text-base sm:text-lg line-clamp-1">
              {product.name}
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
              {product.description}
            </p>
          </div>

          <div className="mt-auto">
            <span className="text-xl sm:text-2xl font-light text-primary">
              R$ {product.price.toFixed(2)}
            </span>
          </div>

          {/* Mobile buttons */}
          <div className="flex gap-2 sm:hidden">
            <Button
              onClick={handleAddToCart}
              className="flex-1"
              size="sm"
            >
              <ShoppingCart className="w-4 h-4" />
            </Button>
            <Button variant="outline" className="flex-1" size="sm">
              Ver
            </Button>
          </div>

          {/* Desktop button */}
          <Button variant="outline" className="hidden sm:block w-full">
            Ver Detalhes
          </Button>
        </div>
      </div>
    </Link>
  );
}