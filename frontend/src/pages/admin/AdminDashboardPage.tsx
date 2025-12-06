import { Link } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { useAuth } from '@/hooks/useAuth';
import Button from '@/components/common/Button';
import { Package, Plus, LogOut } from 'lucide-react';

export default function AdminDashboardPage() {
  const user = useAuthStore((state) => state.user);
  const { logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Painel Admin</h1>
            <p className="text-sm text-gray-600">Olá, {user?.name}</p>
          </div>
          <Button onClick={logout} variant="outline">
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Gerenciar Produtos */}
          <Link to="/admin/products">
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Package className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Produtos</h3>
                  <p className="text-sm text-gray-600">Gerenciar catálogo</p>
                </div>
              </div>
            </div>
          </Link>

          {/* Adicionar Produto */}
          <Link to="/admin/products/new">
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Plus className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Novo Produto</h3>
                  <p className="text-sm text-gray-600">Adicionar ao catálogo</p>
                </div>
              </div>
            </div>
          </Link>

          {/* Ver Site */}
          <Link to="/">
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <span className="text-2xl">🌐</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Ver Site</h3>
                  <p className="text-sm text-gray-600">Visualização pública</p>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Quick Stats */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Visão Geral
          </h2>
          <p className="text-gray-600">
            Use o menu acima para gerenciar os produtos da loja.
          </p>
        </div>
      </main>
    </div>
  );
}