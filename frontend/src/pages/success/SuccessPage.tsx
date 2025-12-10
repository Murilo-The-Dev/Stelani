import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/common/Button';

export default function SuccessPage() {
  return (
    <main className="lilas min-h-screen bg-background flex flex-col">
      <Header />

      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="text-center space-y-6 max-w-md">
          <div className="text-6xl">✅</div>
          <h1 className="text-3xl font-light text-foreground">
            Pedido Enviado!
          </h1>
          <p className="text-muted-foreground">
            Seu pedido foi enviado via WhatsApp. A vendedora entrará em contato em breve para confirmar os detalhes.
          </p>
          <div className="flex gap-3 justify-center">
            <Link to="/products">
              <Button>Continuar Comprando</Button>
            </Link>
            <Link to="/">
              <Button variant="outline">Voltar ao Início</Button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}