import React, { useState } from 'react';
import CompanionCard from '../components/cards/CompanionCard';
import { CHARACTERS_DATA } from '../mock/data';
import { 
  Users, 
  Search, 
  Sparkles, 
  Trophy, 
  Wrench, 
  BookOpen, 
  Compass, 
  Flame,
  ArrowRight
} from 'lucide-react';
import { Link } from '../router/Router';

export default function CommunityPage() {
  const [filter, setFilter] = useState('Todas');
  const [search, setSearch] = useState('');

  const filters = ['Todas', 'Tendencias', 'Realistas', 'Anime', 'Fantasía', 'Cyberpunk'];

  const tools = [
    {
      title: 'Prompt Architect',
      desc: 'Optimiza tus descripciones y prompts para generar fotos cinematográficas con 1 clic.',
      icon: Sparkles,
      color: 'text-amber-400 bg-amber-400/10 border-amber-400/20'
    },
    {
      title: 'Character Builder',
      desc: 'Plantillas prediseñadas y arquetipos de psicología para crear compañeras complejas.',
      icon: Wrench,
      color: 'text-[#ff4747] bg-[#ff4747]/10 border-[#ff4747]/20'
    },
    {
      title: 'Chat Toolkit',
      desc: 'Herramientas de scripting para inicializar escenarios de rol interactivos inmersivos.',
      icon: Compass,
      color: 'text-purple-400 bg-purple-400/10 border-purple-400/20'
    },
    {
      title: 'Nectar Wiki',
      desc: 'Documentación escrita por la comunidad con trucos, mejores prácticas y ejemplos.',
      icon: BookOpen,
      color: 'text-blue-400 bg-blue-400/10 border-blue-400/20'
    }
  ];

  const filtered = CHARACTERS_DATA.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) || 
                          c.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    if (!matchesSearch) return false;
    if (filter === 'Todas') return true;
    if (filter === 'Tendencias') return c.isTrending || c.isHot;
    if (filter === 'Realistas') return c.category === 'Realistic';
    if (filter === 'Anime') return c.category === 'Anime';
    if (filter === 'Fantasía') return c.category === 'Fantasy';
    if (filter === 'Cyberpunk') return c.category === 'Cyberpunk';
    return true;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-8 py-8 pb-24">
      {/* Header */}
      <div className="mb-10 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#ff4747]/10 px-3 py-1 text-xs font-semibold text-[#ff4747] mb-2">
            <Users className="h-3.5 w-3.5" />
            <span>Comunidad Nectar AI</span>
          </div>
          <h1 className="font-extended text-3xl sm:text-5xl font-extrabold text-white">
            Explora las Creaciones de la Comunidad
          </h1>
          <p className="text-sm text-zinc-400 mt-1 max-w-2xl">
            Descubre miles de compañeras únicas creadas por la comunidad global, votadas y compartidas a diario.
          </p>
        </div>

        <Link
          to="/girls/create"
          className="flex h-11 items-center gap-2 rounded-full bg-[#ff4747] px-6 text-xs font-bold text-white shadow-lg shadow-[#ff4747]/20 hover:brightness-110 active:scale-95 transition-all flex-shrink-0"
        >
          <Sparkles className="h-4 w-4" />
          <span>Publicar Mi Personaje</span>
        </Link>
      </div>

      {/* Community Tools Grid */}
      <div className="mb-12">
        <h2 className="font-extended text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Wrench className="h-4 w-4 text-[#ff4747]" />
          <span>Herramientas para Creadores</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {tools.map((t, idx) => {
            const Icon = t.icon;
            return (
              <div 
                key={idx}
                className="group rounded-2xl border border-[#27272a] bg-[#121215] p-5 transition-all hover:border-[#ff4747]/60 hover:-translate-y-0.5 shadow-md"
              >
                <div className={`h-10 w-10 rounded-xl flex items-center justify-center mb-4 border ${t.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-extended text-sm font-bold text-white mb-1.5 group-hover:text-[#ff4747] transition-colors">
                  {t.title}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">{t.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Contests / Workshop Banner */}
      <div className="mb-12 overflow-hidden rounded-2xl border border-purple-500/30 bg-gradient-to-r from-purple-950/40 via-[#18121f] to-[#121215] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-2xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400 flex-shrink-0">
            <Trophy className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-extended text-lg font-bold text-white">
              Concurso Mensual de Creadores: 10,000 Créditos en Premios
            </h3>
            <p className="text-xs text-zinc-400 mt-1 max-w-xl">
              Crea tu compañera con el tag #FantasyLore antes de fin de mes. Las 5 más votadas por la comunidad ganan suscripciones Unlimited gratuitas.
            </p>
          </div>
        </div>
        <button 
          type="button"
          onClick={() => alert('¡Inscripción abierta! Publica tu compañera con la etiqueta #FantasyLore')}
          className="flex h-10 items-center gap-2 rounded-xl bg-purple-600 px-5 text-xs font-bold text-white shadow-lg shadow-purple-600/30 hover:bg-purple-500 transition-colors flex-shrink-0"
        >
          <span>Participar Ahora</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                filter === f 
                  ? 'bg-[#ff4747] text-white shadow-md shadow-[#ff4747]/20' 
                  : 'bg-[#18181b] text-zinc-400 hover:bg-[#27272a] hover:text-white'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
          <input 
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nombre o tag..."
            className="h-9 w-full rounded-full border border-[#27272a] bg-[#121215] pl-9 pr-4 text-xs text-white placeholder-zinc-500 focus:border-[#ff4747] focus:outline-none"
          />
        </div>
      </div>

      {/* Companions Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.map((character) => (
          <CompanionCard key={character.id} character={character} />
        ))}
      </div>
    </div>
  );
}

