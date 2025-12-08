import { Heart, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-purple-100 via-pink-50 to-purple-100 border-t-2 border-purple-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo & Description */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-300 to-pink-300 rounded-full flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <p className="font-bold text-xl bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                Stelani_LM
              </p>
            </div>
            <p className="text-sm text-purple-600">
              Bolsas artesanais feitas com amor
            </p>
            <p className="text-xs text-purple-400 mt-1">
              Cada peça é única e especial
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-8 text-sm">
            <div className="text-center">
              <p className="font-semibold text-purple-700 mb-2">Contato</p>
              <p className="text-purple-500 text-xs">WhatsApp</p>
              <p className="text-purple-400 text-xs">(19) 99785-7685</p>
            </div>
            <div className="text-center">
              <p className="font-semibold text-purple-700 mb-2">Redes</p>
              <p className="text-purple-500 text-xs">Instagram</p>
              <p className="text-purple-400 text-xs">@stelani.loja</p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-purple-200 text-center">
          <p className="text-sm text-purple-500 flex items-center justify-center gap-2">
            Feito com <Heart className="w-4 h-4 text-pink-400 fill-pink-400 animate-pulse" /> por Letícia
          </p>
          <p className="text-xs text-purple-400 mt-1">
            &copy; 2025 Stelani_LM. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}