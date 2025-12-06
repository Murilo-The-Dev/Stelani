import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/common/Button';
import { useCartStore } from '@/store/cartStore';
import { formatWhatsAppMessage, openWhatsApp } from '@/config/constants';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    notes: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const message = formatWhatsAppMessage(
      formData.name,
      formData.phone,
      formData.address,
      items.map(item => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      getTotalPrice(),
      formData.notes
    );
    
    openWhatsApp(message);
    clearCart();
    navigate('/success');
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Header />

      <div className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-light text-foreground">Finalizar Pedido</h1>
            <p className="text-lg text-muted-foreground">
              Preencha seus dados para enviar o pedido via WhatsApp
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-card rounded-lg border border-border p-6 space-y-4">
              <h2 className="text-xl font-semibold text-foreground">
                Informações de Contato
              </h2>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">
                  Nome Completo *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Seu nome"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">
                  Telefone (WhatsApp) *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="(11) 99999-9999"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">
                  Endereço de Entrega *
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  placeholder="Rua, número, bairro, cidade, CEP"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">
                  Observações
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  placeholder="Informações adicionais sobre a entrega"
                />
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-card rounded-lg border border-border p-6 space-y-4">
              <h2 className="text-xl font-semibold text-foreground">
                Resumo do Pedido
              </h2>

              <div className="space-y-2">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between text-muted-foreground"
                  >
                    <span>
                      {item.name} ({item.quantity}x)
                    </span>
                    <span>R$ {(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-4">
                <div className="flex justify-between text-lg font-semibold text-foreground">
                  <span>Total</span>
                  <span className="text-primary">
                    R$ {getTotalPrice().toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-primary/5 rounded-lg p-6 border border-primary/20">
              <p className="text-sm text-foreground">
                ℹ️ Ao clicar em "Enviar Pedido via WhatsApp", você será redirecionado para o WhatsApp com os detalhes do seu pedido preenchidos. A vendedora entrará em contato para confirmar pagamento e entrega.
              </p>
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-base"
            >
              📱 Enviar Pedido via WhatsApp
            </Button>
          </form>
        </div>
      </div>

      <Footer />
    </main>
  );
}