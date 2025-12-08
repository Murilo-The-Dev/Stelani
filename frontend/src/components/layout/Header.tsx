import { Link } from 'react-router-dom';
import { ShoppingBag, Menu, X, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';
import Button from '@/components/common/Button';
import { useCartStore } from '@/store/cartStore';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const totalItems = useCartStore((state) => state.getTotalItems());

  // Fechar menu ao redimensionar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevenir scroll quando menu está aberto
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-purple-100 via-pink-50 to-purple-100 border-b-2 border-purple-200 shadow-sm backdrop-blur-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo - Responsivo */}
          <Link to="/" className="flex items-center gap-2 md:gap-3 group">
            <div className="relative">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-purple-300 to-pink-300 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-white animate-pulse-soft" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl md:text-2xl bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                Stelani_LM
              </span>
              <span className="hidden sm:inline text-xs text-purple-400 font-medium">
                Bolsas Artesanais
              </span>
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
          <div className="flex items-center gap-2 md:gap-4">
            <Link to="/cart" className="relative group">
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-purple-200/50 text-purple-700 h-10 w-10"
              >
                <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[1.25rem] h-5 bg-gradient-to-r from-pink-400 to-purple-400 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-lg animate-pulse px-1">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-purple-700 hover:text-pink-500 p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation - Full Screen Overlay */}
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsMenuOpen(false)}
            />
            
            {/* Menu */}
            <div className="fixed top-16 left-0 right-0 bg-gradient-to-br from-purple-50 to-pink-50 shadow-2xl z-50 md:hidden animate-in slide-in-from-top duration-300">
              <div className="flex flex-col p-6 space-y-4">
                <Link
                  to="/products"
                  className="text-purple-700 hover:text-pink-500 transition-colors py-3 px-4 rounded-xl hover:bg-purple-100 text-lg font-semibold"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Produtos
                </Link>
                <Link
                  to="/custom"
                  className="text-purple-700 hover:text-pink-500 transition-colors py-3 px-4 rounded-xl hover:bg-purple-100 text-lg font-semibold"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Personalizar
                </Link>
                <Link
                  to="/cart"
                  className="text-purple-700 hover:text-pink-500 transition-colors py-3 px-4 rounded-xl hover:bg-purple-100 text-lg font-semibold flex items-center justify-between"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>Carrinho</span>
                  {totalItems > 0 && (
                    <span className="bg-gradient-to-r from-pink-400 to-purple-400 text-white text-sm rounded-full px-3 py-1 font-bold">
                      {totalItems}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          </>
        )}
      </nav>
    </header>
  );
}