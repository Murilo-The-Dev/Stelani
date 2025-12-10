import { Link } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { useAuth } from '@/hooks/useAuth';
import { useStats } from '@/hooks/useStats';
import Button from '@/components/common/Button';
import {
  Package,
  Plus,
  LogOut,
  Sparkles,
  Eye,
  BarChart3
} from 'lucide-react';

export default function AdminDashboardPage() {
  const user = useAuthStore((state) => state.user);
  const { logout } = useAuth();
  const { data: stats, isLoading } = useStats();

  return (
    <div className="lilas min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Painel Admin</h1>
            <p className="text-sm text-gray-600">Bem-vinda de volta, {user?.name}</p>
          </div>
          <Button onClick={logout} variant="outline" size="sm">
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
        
        {/* Top Grid: Stats & Main Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          
          {/* 1. Stats Card */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border-2 border-purple-200 shadow-sm relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-200 rounded-lg">
                <BarChart3 className="w-6 h-6 text-purple-700" />
              </div>
              <Sparkles className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-purple-600 mb-1">Total de Produtos</p>
              <p className="text-3xl font-bold text-purple-900">
                {isLoading ? <span className="animate-pulse">...</span> : stats?.total_products || 0}
              </p>
            </div>
          </div>

          {/* 2. Gerenciar Produtos */}
          <Link to="/admin/products" className="group">
            <div className="bg-white p-6 rounded-xl border-2 border-gray-200 shadow-sm hover:shadow-md transition-all hover:border-primary/50 cursor-pointer h-full">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <Package className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">Produtos</h3>
                  <p className="text-sm text-gray-600">Gerenciar catálogo</p>
                </div>
              </div>
            </div>
          </Link>

          {/* 3. Adicionar Produto */}
          <Link to="/admin/products/new" className="group">
            <div className="bg-white p-6 rounded-xl border-2 border-gray-200 shadow-sm hover:shadow-md transition-all hover:border-green-300 cursor-pointer h-full">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                  <Plus className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-green-700 transition-colors">Novo Produto</h3>
                  <p className="text-sm text-gray-600">Adicionar item</p>
                </div>
              </div>
            </div>
          </Link>

          {/* 4. Ver Site */}
          <Link to="/" className="group">
            <div className="bg-white p-6 rounded-xl border-2 border-gray-200 shadow-sm hover:shadow-md transition-all hover:border-purple-300 cursor-pointer h-full">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                  <Eye className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-purple-700 transition-colors">Ver Loja</h3>
                  <p className="text-sm text-gray-600">Visualização pública</p>
                </div>
              </div>
            </div>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Side Panel: Tips & Info */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
                  <Sparkles className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-blue-900 mb-2">Dicas de Venda</h3>
                  <ul className="text-sm text-blue-800 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500">•</span>
                      Fotos de alta qualidade aumentam a conversão.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500">•</span>
                      Descreva bem os detalhes técnicos.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500">•</span>
                      Mantenha o estoque sempre atualizado.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}