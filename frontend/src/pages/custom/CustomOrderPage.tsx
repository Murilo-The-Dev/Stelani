import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/common/Button';
import { formatWhatsAppMessage, openWhatsApp } from '@/config/constants';

export default function CustomOrderPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    colors: '',
    size: 'medio',
    quantity: 1,
    description: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const calculateBasePrice = () => {
    const basePrice = formData.size === 'pequeno' ? 54.9 : formData.size === 'medio' ? 79.9 : 99.9;
    return formData.quantity > 1 ? basePrice * 0.9 : basePrice; // 10% desconto para múltiplas
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const sizeMap = {
      pequeno: 'Pequeno (15cm x 12cm)',
      medio: 'Médio (20cm x 17cm)',
      grande: 'Grande (25cm x 22cm)',
    };

    const customMessage = `Olá! Sou *${formData.name}*
📱 ${formData.phone}
📧 ${formData.email}

🎨 *ENCOMENDA PERSONALIZADA*

🎨 Cores desejadas: ${formData.colors}
📏 Tamanho: ${sizeMap[formData.size as keyof typeof sizeMap]}
🔢 Quantidade: ${formData.quantity}

📝 Descrição:
${formData.description}

💰 Preço Base Estimado: R$ ${(calculateBasePrice() * formData.quantity).toFixed(2)}
${formData.quantity > 1 ? '(10% de desconto aplicado para múltiplas unidades)' : ''}`;

    openWhatsApp(encodeURIComponent(customMessage));
    navigate('/success');
  };

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Header />

      <div className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-light text-foreground">
              Encomendar Personalizada
            </h1>
            <p className="text-lg text-muted-foreground">
              Crie sua bolsa com as cores e design que você deseja
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-card rounded-lg border border-border p-8 space-y-6"
          >
            {/* Personal Info */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">
                Informações Pessoais
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground">
                    Nome *
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
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="seu@email.com"
                  />
                </div>
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
            </div>

            {/* Design Options */}
            <div className="space-y-4 border-t border-border pt-6">
              <h2 className="text-xl font-semibold text-foreground">
                Personalização
              </h2>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">
                  Cores Desejadas *
                </label>
                <input
                  type="text"
                  name="colors"
                  value={formData.colors}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Ex: rosa, roxo, branco"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground">
                    Tamanho *
                  </label>
                  <select
                    name="size"
                    value={formData.size}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="pequeno">Pequeno (15cm x 12cm)</option>
                    <option value="medio">Médio (20cm x 17cm)</option>
                    <option value="grande">Grande (25cm x 22cm)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground">
                    Quantidade *
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    min="1"
                    max="50"
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">
                  Descrição Detalhada
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  placeholder="Descreva detalhes do design, padrões, desenhos especiais, etc."
                />
              </div>
            </div>

            {/* Pricing Info */}
            <div className="bg-muted rounded-lg p-6 space-y-2 border border-border">
              <p className="text-foreground">
                <span className="font-semibold">Preço Base Estimado:</span> R${' '}
                {(calculateBasePrice() * formData.quantity).toFixed(2)}
              </p>
              <p className="text-sm text-muted-foreground">
                {formData.quantity > 1
                  ? '🎉 10% de desconto para múltiplas unidades!'
                  : 'Preços para encomendas em quantidade podem ter desconto especial'}
              </p>
            </div>

            {/* Submit */}
            <div className="flex gap-3">
              <Button
                type="submit"
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground text-base py-6"
              >
                📱 Enviar Encomenda via WhatsApp
              </Button>
            </div>
          </form>

          {/* Info */}
          <div className="bg-primary/5 rounded-lg p-6 border border-primary/20 space-y-3">
            <p className="font-semibold text-foreground">Próximos Passos</p>
            <ol className="space-y-2 text-muted-foreground text-sm list-decimal list-inside">
              <li>Você será redirecionado para o WhatsApp com suas especificações</li>
              <li>Nossa artesã entrará em contato em até 24 horas</li>
              <li>Discutiremos os detalhes do seu design</li>
              <li>Você receberá um orçamento final e prazo de entrega</li>
              <li>Produção com entrega em 7-14 dias úteis</li>
            </ol>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}