import React from 'react';
import { Link } from '../../router/Router';
import { Heart, ShieldCheck, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-[#27272a] bg-[#0c0c0e] pt-12 pb-24 md:pb-12 text-zinc-400">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5 lg:gap-12">
          {/* Brand Info */}
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <img src="/assets/heart_logo.webp" alt="Nectar AI" className="h-8 w-8" />
              <span className="font-extended text-2xl font-bold tracking-tight text-white">Nectar AI</span>
            </Link>
            <p className="text-sm leading-relaxed text-zinc-400 max-w-sm mb-6">
              La plataforma líder mundial de creación y conversación con compañeras de inteligencia artificial. Chatea sin restricciones, genera fotos hiperrealistas y videos animados fluidos en tiempo real.
            </p>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-400">
                <ShieldCheck className="h-3.5 w-3.5" /> Encriptación de Extremo a Extremo
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#ff4747]/30 bg-[#ff4747]/10 px-2.5 py-1 text-xs font-semibold text-[#ff4747]">
                18+ Adultos
              </span>
            </div>
          </div>

          {/* Navigation Column 1: Nectar */}
          <div>
            <h4 className="font-semibold text-zinc-100 text-sm mb-4">Plataforma</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/" className="hover:text-white transition-colors">Inicio</Link></li>
              <li><Link to="/messages" className="hover:text-white transition-colors">Mensajes y Chat</Link></li>
              <li><Link to="/girls/create" className="hover:text-white transition-colors">Crear Compañera</Link></li>
              <li><Link to="/create" className="hover:text-white transition-colors">Generar Medios</Link></li>
              <li><Link to="/community" className="hover:text-white transition-colors">Galería Comunitaria</Link></li>
            </ul>
          </div>

          {/* Navigation Column 2: Descubrir */}
          <div>
            <h4 className="font-semibold text-zinc-100 text-sm mb-4">Descubrir</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/tag" className="hover:text-white transition-colors">Explorador de Tags</Link></li>
              <li><Link to="/pricing" className="hover:text-white transition-colors">Planes y Precios</Link></li>
              <li><Link to="/affiliate" className="hover:text-white transition-colors">Programa de Afiliados</Link></li>
              <li><Link to="/user/saves/companions" className="hover:text-white transition-colors">Mis Guardados</Link></li>
              <li><Link to="/dashboard" className="hover:text-white transition-colors">Panel de Control</Link></li>
            </ul>
          </div>

          {/* Navigation Column 3: Legal & Ayuda */}
          <div>
            <h4 className="font-semibold text-zinc-100 text-sm mb-4">Recursos</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/docs" className="hover:text-white transition-colors">Documentación Oficial</Link></li>
              <li><a href="https://discord.gg/4u2jFcz5VN" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Comunidad de Discord</a></li>
              <li><a href="https://reddit.com/r/NectarAI/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Reddit Oficial</a></li>
              <li><a href="https://twitter.com/TryNectarAI" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">X / Twitter</a></li>
              <li><span className="text-zinc-500 cursor-not-allowed">Términos de Servicio</span></li>
              <li><span className="text-zinc-500 cursor-not-allowed">Política de Privacidad</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal Notice */}
        <div className="mt-12 pt-6 border-t border-[#27272a] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© 2026 Nectar AI Inc. Todos los derechos reservados. Todos los personajes generados son ficticios y mayores de 18 años.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-zinc-400">Seguridad & Cumplimiento</span>
            <span>•</span>
            <span className="hover:text-zinc-400">Aviso 2257</span>
            <span>•</span>
            <span className="hover:text-zinc-400">DMCA</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

