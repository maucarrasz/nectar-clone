import React, { useState } from 'react';
import { Link, useRouter } from '../../router/Router';
import { 
  Home, 
  MessageSquare, 
  Plus, 
  ImagePlus, 
  Users, 
  CreditCard, 
  Tag, 
  TrendingUp, 
  Bookmark, 
  User, 
  LayoutDashboard, 
  BookOpen, 
  Globe, 
  X,
  Sparkles
} from 'lucide-react';

export default function Sidebar({ isOpen, onClose, onOpenAuth }) {
  const { currentPath } = useRouter();
  const [activeGender, setActiveGender] = useState('female');

  const navItems = [
    { name: 'Inicio', path: '/', icon: Home },
    { name: 'Mensajes', path: '/messages', icon: MessageSquare },
    { name: 'Crear', path: '/girls/create', icon: Plus },
    { name: 'Generar', path: '/create', icon: ImagePlus },
    { name: 'Comunidad', path: '/community', icon: Users, badge: '¡Nuevo!' },
    { name: 'Precios', path: '/pricing', icon: CreditCard },
    { name: 'Etiquetas', path: '/tag', icon: Tag },
    { name: 'Afiliados', path: '/affiliate', icon: TrendingUp },
    { name: 'Guardados', path: '/user/saves/companions', icon: Bookmark },
    { name: 'Perfil', path: '/u/username', icon: User },
    { name: 'Panel', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Docs', path: '/docs', icon: BookOpen },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm transition-opacity md:hidden"
          onClick={onClose}
        />
      )}

      {/* Aside Container */}
      <aside 
        id="sidebar" 
        role="navigation" 
        className={`group/sidebar scrollbar fixed inset-y-0 left-0 z-50 flex h-[100dvh] flex-col justify-between overflow-y-auto border-r border-[#27272a] bg-[#0c0c0e] transition-transform duration-300 md:translate-x-0 ${
          isOpen ? 'w-[75vw] max-w-[320px] translate-x-0' : '-translate-x-full md:w-[72px] md:hover:w-[260px]'
        }`}
      >
        <div className="flex w-full flex-grow flex-col p-3 md:p-4">
          {/* Header & Logo */}
          <header className="flex flex-shrink-0 items-center justify-between pb-3">
            <Link to="/" className="flex items-center gap-3">
              <img 
                src="/assets/heart_logo.webp" 
                alt="Nectar Logo" 
                className="h-8 w-8 object-contain transition-transform group-hover/sidebar:rotate-6"
              />
              <div className={`transition-all ${isOpen ? 'block' : 'md:hidden md:group-hover/sidebar:block'}`}>
                <div className="flex items-center gap-1.5">
                  <span className="font-extended text-xl font-bold tracking-tight text-white">Nectar</span>
                  <span className="rounded bg-[#ff4747]/20 px-1 py-0.5 text-[10px] font-bold text-[#ff4747]">AI</span>
                </div>
              </div>
            </Link>
            
            {/* Close Button Mobile */}
            <button 
              className="p-1 text-zinc-400 hover:text-white md:hidden"
              onClick={onClose}
              title="Cerrar menú"
            >
              <X className="h-6 w-6" />
            </button>
          </header>

          {/* Navigation Links */}
          <nav className="flex-grow space-y-1.5 pt-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPath === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => onClose && onClose()}
                  className={`group/link flex h-11 w-full items-center gap-3 rounded-xl px-3 transition-colors ${
                    isActive 
                      ? 'bg-[#ff4747] text-white font-medium shadow-md shadow-[#ff4747]/20' 
                      : 'text-zinc-400 hover:bg-[#18181b] hover:text-zinc-100'
                  }`}
                >
                  <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center">
                    <Icon className={`h-5 w-5 transition-transform group-hover/link:scale-110 ${isActive ? 'text-white' : 'text-zinc-400 group-hover/link:text-white'}`} />
                  </span>
                  <span className={`text-sm tracking-wide truncate transition-all ${isOpen ? 'inline' : 'md:hidden md:group-hover/sidebar:inline'}`}>
                    {item.name}
                  </span>
                  {item.badge && (
                    <span className={`ml-auto rounded-full bg-[#ff4747]/20 px-2 py-0.5 text-[10px] font-bold text-[#ff4747] ${isOpen ? 'inline-block' : 'md:hidden md:group-hover/sidebar:inline-block'}`}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Footer Controls within Sidebar */}
          <div className="flex-shrink-0 pt-4 space-y-3 border-t border-[#27272a]/60">
            {/* Gender Toggle */}
            <div className={`hidden items-center justify-center overflow-hidden rounded-xl border border-[#27272a] bg-[#121215] md:flex ${isOpen ? 'w-full' : 'md:group-hover/sidebar:w-full'}`}>
              <div className={`hidden h-9 w-full divide-x divide-[#27272a] ${isOpen ? 'flex' : 'md:group-hover/sidebar:flex'}`}>
                <button 
                  type="button"
                  onClick={() => setActiveGender('female')}
                  className={`flex-1 text-xs font-medium transition-colors ${activeGender === 'female' ? 'bg-[#ff4747] text-white' : 'text-zinc-400 hover:bg-[#18181b]'}`}
                >
                  Mujer
                </button>
                <button 
                  type="button"
                  onClick={() => setActiveGender('male')}
                  className={`flex-1 text-xs font-medium transition-colors ${activeGender === 'male' ? 'bg-[#ff4747] text-white' : 'text-zinc-400 hover:bg-[#18181b]'}`}
                >
                  Hombre
                </button>
                <button 
                  type="button"
                  onClick={() => setActiveGender('anime')}
                  className={`flex-1 text-xs font-medium transition-colors ${activeGender === 'anime' ? 'bg-[#ff4747] text-white' : 'text-zinc-400 hover:bg-[#18181b]'}`}
                >
                  Anime
                </button>
              </div>
              <div className={`p-2 ${isOpen ? 'hidden' : 'md:group-hover/sidebar:hidden'}`}>
                <Sparkles className="h-4 w-4 text-[#ff4747]" />
              </div>
            </div>

            {/* Language Pill */}
            <button 
              type="button"
              className="flex h-10 w-full items-center gap-2.5 rounded-xl border border-[#27272a] bg-[#121215] px-3 text-xs text-zinc-400 transition-colors hover:bg-[#18181b] hover:text-white"
            >
              <Globe className="h-4 w-4 text-zinc-400 flex-shrink-0" />
              <span className={`truncate ${isOpen ? 'inline' : 'md:hidden md:group-hover/sidebar:inline'}`}>
                Español (ES)
              </span>
            </button>
          </div>
        </div>

        {/* Auth / Profile CTA Bottom */}
        <div className="flex w-full items-center justify-center border-t border-[#27272a] p-3 bg-[#09090b]/80">
          <button 
            type="button"
            onClick={onOpenAuth}
            className={`flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#ff4747] to-[#e03e3e] px-3 text-xs font-semibold text-white shadow-lg shadow-[#ff4747]/20 transition-all hover:brightness-110 active:scale-95`}
          >
            <User className="h-4 w-4" />
            <span className={`${isOpen ? 'inline' : 'md:hidden md:group-hover/sidebar:inline'}`}>
              Iniciar Sesión
            </span>
          </button>
        </div>
      </aside>
    </>
  );
}

