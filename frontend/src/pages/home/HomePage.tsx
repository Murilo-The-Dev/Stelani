import { useAuthStore } from '@/store/authStore';
import { useAuth } from '@/hooks/useAuth';

export default function HomePage() {
  const { user, isAuthenticated } = useAuthStore();
  const { logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-purple-600">STELANI</h1>
          {isAuthenticated && (
            <div className="flex items-center gap-4">
              <span className="text-gray-700">Olá, {user?.name}</span>
              <button
                onClick={logout}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Sair
              </button>
            </div>
          )}
        </div>
      </nav>
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-4">Bem-vindo à Stelani!</h2>
        <p className="text-gray-600">Bolsas artesanais em miçangas feitas com amor ♥</p>
      </main>
    </div>
  );
}