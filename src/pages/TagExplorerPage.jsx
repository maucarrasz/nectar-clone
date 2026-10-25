import React, { useState } from 'react';
import { TAGS_LIST, CHARACTERS_DATA } from '../mock/data';
import CompanionCard from '../components/cards/CompanionCard';
import { Tag, Search, Sparkles, Flame, Users } from 'lucide-react';

export default function TagExplorerPage() {
  const [search, setSearch] = useState('');
  const [selectedTag, setSelectedTag] = useState(TAGS_LIST[0].name);

  const filteredTags = TAGS_LIST.filter(t => 
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.desc.toLowerCase().includes(search.toLowerCase())
  );

  const charactersForTag = CHARACTERS_DATA;

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-8 py-8 pb-24">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-[#ff4747]/10 px-3 py-1 text-xs font-semibold text-[#ff4747] mb-2">
          <Tag className="h-3.5 w-3.5" />
          <span>Catálogo de Temáticas y Arquetipos</span>
        </div>
        <h1 className="font-extended text-3xl sm:text-5xl font-extrabold text-white">
          Explora Etiquetas para Rol y Compañeras
        </h1>
        <p className="text-sm text-zinc-400 mt-1 max-w-2xl">
          Filtra entre más de 90 arquetipos de personalidad, tropos de romance, mundos de fantasía y fetiches para encontrar tu match perfecto.
        </p>
      </div>

      {/* Search Input */}
      <div className="mb-8 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
          <input 
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar etiquetas (ej: Dandere, RPG, Romance, Gótica)..."
            className="h-10 w-full rounded-xl border border-[#27272a] bg-[#121215] pl-9 pr-3 text-xs text-white placeholder-zinc-500 focus:border-[#ff4747] focus:outline-none focus:ring-1 focus:ring-[#ff4747]"
          />
        </div>
      </div>

      {/* Tag Cloud */}
      <div className="mb-12 rounded-2xl border border-[#27272a] bg-[#121215] p-5 shadow-lg">
        <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3 flex items-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5 text-[#ff4747]" />
          <span>Etiquetas Populares</span>
        </h3>
        <div className="flex flex-wrap gap-2.5">
          {filteredTags.map((tag) => {
            const isSelected = selectedTag === tag.name;
            return (
              <button
                key={tag.name}
                type="button"
                onClick={() => setSelectedTag(tag.name)}
                className={`flex items-center gap-1.5 rounded-xl border px-3.5 py-2 text-xs transition-all ${
                  isSelected 
                    ? 'border-[#ff4747] bg-[#ff4747] text-white font-bold shadow-md shadow-[#ff4747]/30 scale-105' 
                    : 'border-[#27272a] bg-[#18181b] text-zinc-300 hover:border-zinc-500 hover:text-white'
                }`}
              >
                <span>{tag.emoji}</span>
                <span>{tag.name}</span>
                <span className={`text-[10px] ml-1 rounded-full px-1.5 py-0.2 ${isSelected ? 'bg-black/30 text-white' : 'bg-black/40 text-zinc-400'}`}>
                  {tag.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Tag Header */}
      <div className="mb-6 flex items-center justify-between border-b border-[#27272a] pb-4">
        <div>
          <h2 className="font-extended text-2xl font-bold text-white flex items-center gap-2">
            <span>Compañeras con la etiqueta</span>
            <span className="text-[#ff4747]">#{selectedTag}</span>
          </h2>
          <p className="text-xs text-zinc-400 mt-0.5">
            {TAGS_LIST.find(t => t.name === selectedTag)?.desc || 'Explora personajes con esta personalidad.'}
          </p>
        </div>
        <span className="text-xs font-semibold text-zinc-400">{charactersForTag.length} Resultados</span>
      </div>

      {/* Companions Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {charactersForTag.map((char) => (
          <CompanionCard key={char.id} character={char} />
        ))}
      </div>
    </div>
  );
}
