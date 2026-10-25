import React, { useState, useEffect } from 'react';
import { Menu, Search, Flame, ShieldAlert, Sparkles, User, Bell } from 'lucide-react';
import { Link } from '../../router/Router';

export default function Header({ onOpenSidebar, onOpenAuth }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [nsfwEnabled, setNsfwEnabled] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`sticky top-0 z-30 transition-all duration-200 border-b ${
        isScrolled 
          ? 'bg-[#09090b]/80 backdrop-blur-md border-[#27272a] shadow-lg shadow-black/40' 
          : 'bg-[#09090b]/60 backdrop-blur-sm border-[#27272a]/40'
      }`}
    >
      <div className="flex h-14 md:h-16 w-full items-center justify-between px-3 md:px-6 gap-3">
        {/* Left: Mobile Menu Trigger & Logo */}
        <div className="flex items-center gap-3">
          <button 
            type="button"
            onClick={onOpenSidebar}
            className="p-1.5 text-zinc-400 hover:text-white md:hidden"
            aria-label="Abrir menú lateral"
          >
            <Menu className="h-6 w-6" />
          </button>

          <Link to="/" className="flex items-center gap-2 md:hidden">
            <img src="/assets/heart_logo.webp" alt="Nectar" className="h-7 w-7" />
            <span className="font-extended text-lg font-bold text-white">Nectar</span>
          </Link>

          {/* Desktop Search */}
          <div className="hidden lg:flex items-center relative w-72">
            <Search className="absolute left-3 h-4 w-4 text-zinc-400" />
            <input 
              type="text"
              placeholder="Buscar compañeras, etiquetas, temas..."
              className="h-9 w-full rounded-full border border-[#27272a] bg-[#121215] pl-9 pr-4 text-xs text-zinc-200 placeholder-zinc-500 transition-colors focus:border-[#ff4747] focus:outline-none focus:ring-1 focus:ring-[#ff4747]"
            />
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* NSFW Filter Toggle */}
          <button
            type="button"
            onClick={() => setNsfwEnabled(!nsfwEnabled)}
            className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold transition-all ${
              nsfwEnabled 
                ? 'bg-[#ff4747]/15 text-[#ff4747] border border-[#ff4747]/40 shadow-sm shadow-[#ff4747]/20' 
                : 'bg-[#18181b] text-zinc-400 border border-[#27272a]'
            }`}
            title="Activar / Desactivar filtro 18+ sin censura"
          >
            <Flame className={`h-3.5 w-3.5 ${nsfwEnabled ? 'text-[#ff4747] animate-pulse' : 'text-zinc-500'}`} />
            <span className="hidden sm:inline">{nsfwEnabled ? '18+ Sin Censura' : 'Modo Seguro'}</span>
            <span className="sm:hidden">18+</span>
          </button>

          {/* Credits Counter Pill */}
          <Link
            to="/pricing"
            className="flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-300 transition-colors hover:bg-amber-500/20"
          >
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            <span>250 <span className="hidden sm:inline">Créditos</span></span>
          </Link>

          {/* Notifications Button */}
          <button 
            type="button"
            onClick={onOpenAuth}
            className="hidden sm:flex h-9 w-9 items-center justify-center rounded-full border border-[#27272a] bg-[#121215] text-zinc-400 transition-colors hover:text-white hover:border-zinc-700"
            title="Notificaciones"
          >
            <Bell className="h-4 w-4" />
          </button>

          {/* Login / Register CTAs */}
          <button
            type="button"
            onClick={onOpenAuth}
            className="hidden sm:inline-flex h-9 items-center justify-center rounded-full border border-[#27272a] bg-[#121215] px-4 text-xs font-medium text-zinc-200 transition-colors hover:bg-[#18181b] hover:text-white"
          >
            Iniciar Sesión
          </button>

          <button
            type="button"
            onClick={onOpenAuth}
            className="flex h-9 items-center justify-center gap-1.5 rounded-full bg-[#ff4747] px-4 text-xs font-bold text-white shadow-md shadow-[#ff4747]/25 transition-all hover:brightness-110 active:scale-95"
          >
            <User className="h-3.5 w-3.5 sm:hidden" />
            <span>Crear Cuenta</span>
          </button>
        </div>
      </div>
    </header>
  );
}

