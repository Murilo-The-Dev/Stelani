import { Heart, Sparkles } from 'lucide-react';

export default function Footer() {
return (
<footer className="bg-gradient-to-r from-purple-100 via-pink-50 to-purple-100 border-t-2 border-purple-200 py-4 sm:py-6">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-3">
<div className="text-center md:text-left">
<div className="flex items-center justify-center md:justify-start gap-2 mb-1">
<div className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
      <img 
        src="/images/logo.png" 
        alt="Stelani Logo" 
        className="w-full h-full object-contain"
      />
    </div>
<p className="font-bold text-lg bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
Stelani_LM
</p>
</div>
<p className="text-xs text-purple-600">Bolsas artesanais feitas com amor</p>
<p className="text-[11px] text-purple-400">Cada peça é única e especial</p>
</div>

      <div className="flex gap-6 sm:gap-8 text-xs">
        <div className="text-center">
          <p className="font-semibold text-purple-700 mb-1">Contato</p>
          <p className="text-purple-500">WhatsApp</p>
          <p className="text-purple-400">(19) 99785-7685</p>
        </div>
        <div className="text-center">
          <p className="font-semibold text-purple-700 mb-1">Redes</p>
          <p className="text-purple-500">Instagram</p>
          <p className="text-purple-400">@stelani.loja</p>
        </div>
      </div>
    </div>

    <div className="mt-4 sm:mt-5 pt-3 border-t border-purple-200 text-center">
      <p className="text-xs text-purple-500 flex items-center justify-center gap-1">
        Feito com <Heart className="w-3 h-3 text-pink-400 fill-pink-400 animate-pulse" /> por Letícia
      </p>
      <p className="text-[11px] text-purple-400">© 2025 Stelani_LM. Todos os direitos reservados.</p>
    </div>
  </div>
</footer>


);
}