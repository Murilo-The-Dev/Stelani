import { Link, useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/common/Button';
import { useCartStore } from '@/store/cartStore';
import { Trash2, Plus, Minus } from 'lucide-react';

export default function CartPage() {
  const navigate = useNavigate();
  const { items, removeItem, updateQuantity, getTotalPrice } = useCartStore();
  
  const subtotal = getTotalPrice();
  const total = subtotal;

  const handleCheckout = () => {
    if (items.length > 0) {
      navigate('/checkout');
    }
  };

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Header />

      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-6 py-20">
            <div className="text-6xl">🛍️</div>
            <h1 className="text-3xl font-light text-foreground">Carrinho Vazio</h1>
            <p className="text-muted-foreground">
              Adicione bolsas artesanais para começar
            </p>
            <Link to="/products">
              <Button>Explorar Produtos</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Items */}
            <div className="lg:col-span-2 space-y-4">
              <h1 className="text-3xl font-light text-foreground mb-6">
                Carrinho de Compras
              </h1>

              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 bg-card border border-border rounded-lg p-4"
                >
                  {/* Image */}
                  <div className="relative w-24 h-24 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col gap-2">
                    <h3 className="font-semibold text-foreground">{item.name}</h3>
                    <p className="text-primary font-semibold">
                      R$ {item.price.toFixed(2)}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-3 py-1 bg-muted rounded text-foreground font-semibold min-w-12 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Total & Remove */}
                  <div className="flex flex-col items-end justify-between">
                    <p className="font-semibold text-foreground">
                      R$ {(item.price * item.quantity).toFixed(2)}
                    </p>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="bg-card border border-border rounded-lg p-6 h-fit sticky top-24 space-y-4">
              <h2 className="text-xl font-semibold text-foreground">
                Resumo do Pedido
              </h2>

              <div className="space-y-3 border-b border-border pb-4">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>R$ {subtotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between text-lg font-semibold text-foreground">
                <span>Total</span>
                <span className="text-primary">R$ {total.toFixed(2)}</span>
              </div>

              <Button
                onClick={handleCheckout}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-base"
              >
                Finalizar Pedido
              </Button>

              <Link to="/products">
                <Button variant="outline" className="w-full">
                  Continuar Comprando
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}