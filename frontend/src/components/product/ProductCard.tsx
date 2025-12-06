import { Link } from 'react-router-dom';
import Button from '@/components/common/Button';
import { Product } from '@/services/api/endpoints/products';
import { useCartStore } from '@/store/cartStore';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  
  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0]?.image_url || '/placeholder.jpg',
    });
  };

  return (
    <div className="group flex flex-col gap-4">
      {/* Image Container */}
      <Link to={`/products/${product.id}`}>
        <div className="relative aspect-square bg-muted rounded-lg overflow-hidden">
          <img
            src={product.images[0]?.image_url || '/placeholder.jpg'}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-col gap-3">
        <div>
          <h3 className="font-semibold text-foreground text-lg">
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {product.description}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-light text-primary">
            R$ {product.price.toFixed(2)}
          </span>
        </div>

        <div className="flex gap-2">
          <Link to={`/products/${product.id}`} className="flex-1">
            <Button variant="outline" className="w-full">
              Ver Detalhes
            </Button>
          </Link>
          <Button onClick={handleAddToCart} className="flex-1">
            Adicionar
          </Button>
        </div>
      </div>
    </div>
  );
}