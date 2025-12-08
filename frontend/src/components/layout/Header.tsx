import { Link } from 'react-router-dom';
import { ShoppingBag, Menu, X, Sparkles } from 'lucide-react';
import { useState } from 'react';
import Button from '@/components/common/Button';
import { useCartStore } from '@/store/cartStore';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const totalItems = useCartStore((state) => state.getTotalItems());

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-purple-100 via-pink-50 to-purple-100 border-b-2 border-purple-200 shadow-sm backdrop-blur-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-300 to-pink-300 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Sparkles className="w-6 h-6 text-white animate-pulse-soft" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-2xl bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                Stelani_LM
              </span>
              <span className="text-xs text-purple-400 font-medium">Bolsas Artesanais</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/products"
              className="text-purple-700 hover:text-pink-500 transition-colors text-sm font-semibold"
            >
              Produtos
            </Link>
            <Link
              to="/custom"
              className="text-purple-700 hover:text-pink-500 transition-colors text-sm font-semibold"
            >
              Personalizar
            </Link>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <Link to="/cart" className="relative group">
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-purple-200/50 text-purple-700"
              >
                <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-pink-400 to-purple-400 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-lg animate-pulse">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-purple-700 hover:text-pink-500"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 flex flex-col gap-3 animate-in slide-in-from-top">
            <Link
              to="/products"
              className="text-purple-700 hover:text-pink-500 transition-colors py-2 px-4 rounded-lg hover:bg-purple-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Produtos
            </Link>
            <Link
              to="/custom"
              className="text-purple-700 hover:text-pink-500 transition-colors py-2 px-4 rounded-lg hover:bg-purple-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Personalizar
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}