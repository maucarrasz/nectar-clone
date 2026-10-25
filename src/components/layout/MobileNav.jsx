import React from 'react';
import { Home, MessageSquare, Plus, ImagePlus, Users } from 'lucide-react';
import { Link, useRouter } from '../../router/Router';

export default function MobileNav() {
  const { currentPath } = useRouter();

  const navItems = [
    { name: 'Inicio', path: '/', icon: Home },
    { name: 'Chat', path: '/messages', icon: MessageSquare },
    { name: 'Crear', path: '/girls/create', icon: Plus, isAction: true },
    { name: 'Generar', path: '/create', icon: ImagePlus },
    { name: 'Comunidad', path: '/community', icon: Users },
  ];

  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-[#27272a] bg-[#0c0c0e]/95 backdrop-blur-lg pb-[env(safe-area-inset-bottom)] md:hidden">
      <div className="flex h-14 items-center justify-around px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPath === item.path;

          if (item.isAction) {
            return (
              <Link
                key={item.path}
                to={item.path}
                className="flex flex-col items-center justify-center -mt-4"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#ff4747] text-white shadow-lg shadow-[#ff4747]/40 transition-transform active:scale-95">
                  <Icon className="h-6 w-6 stroke-[2.5]" />
                </div>
                <span className="mt-1 text-[10px] font-semibold text-zinc-300">
                  {item.name}
                </span>
              </Link>
            );
          }

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-1 flex-col items-center justify-center gap-0.5 py-1 transition-colors ${
                isActive ? 'text-[#ff4747]' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className={`text-[10px] font-medium leading-tight ${isActive ? 'font-bold' : ''}`}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

