import React, { useState } from 'react';
import CompanionCard from '../components/cards/CompanionCard';
import { CHARACTERS_DATA } from '../mock/data';
import { Bookmark, Heart, Sparkles, FolderHeart } from 'lucide-react';
import { Link } from '../router/Router';

export default function SavedCompanionsPage() {
  const [activeTab, setActiveTab] = useState('bookmarks');
  const [savedCompanions, setSavedCompanions] = useState(CHARACTERS_DATA.slice(0, 3));

  const handleRemove = (charId) => {
    setSavedCompanions(prev => prev.filter(c => c.id !== charId));
  };

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-8 py-8 pb-24">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-[#ff4747]/10 px-3 py-1 text-xs font-semibold text-[#ff4747] mb-2">
          <FolderHeart className="h-3.5 w-3.5" />
          <span>Tu Colección Personal</span>
        </div>
        <h1 className="font-extended text-3xl sm:text-4xl font-extrabold text-white">
          Personajes Guardados y Favoritos
        </h1>
        <p className="text-sm text-zinc-400 mt-1">
          Accede rápidamente a tus compañeras guardadas, me gusta y creaciones desbloqueadas.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#27272a] mb-8 gap-6">
        <button
          type="button"
          onClick={() => setActiveTab('bookmarks')}
          className={`flex items-center gap-2 pb-3 text-xs font-bold transition-all relative ${
            activeTab === 'bookmarks' ? 'text-[#ff4747]' : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Bookmark className="h-4 w-4" />
          <span>Marcadores ({savedCompanions.length})</span>
          {activeTab === 'bookmarks' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ff4747]" />
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('likes')}
          className={`flex items-center gap-2 pb-3 text-xs font-bold transition-all relative ${
            activeTab === 'likes' ? 'text-[#ff4747]' : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Heart className="h-4 w-4" />
          <span>Me Gusta (5)</span>
          {activeTab === 'likes' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ff4747]" />
          )}
        </button>
      </div>

      {/* Saved Grid */}
      {savedCompanions.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {savedCompanions.map((char) => (
            <div key={char.id} className="relative group">
              <CompanionCard 
                character={char} 
                isSaved={true} 
                onToggleSave={() => handleRemove(char.id)}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-[#27272a] p-16 text-center bg-[#121215]/50 max-w-xl mx-auto">
          <FolderHeart className="mx-auto h-12 w-12 text-zinc-600 mb-4" />
          <h3 className="font-extended text-lg font-bold text-white mb-1">
            No tienes compañeras guardadas aún
          </h3>
          <p className="text-xs text-zinc-400 mb-6 max-w-sm mx-auto">
            Explora la comunidad y toca el icono de corazón en cualquier tarjeta para guardarla en tu colección personal.
          </p>
          <Link
            to="/community"
            className="inline-flex items-center gap-2 rounded-full bg-[#ff4747] px-6 py-2.5 text-xs font-bold text-white shadow-lg shadow-[#ff4747]/20 hover:brightness-110"
          >
            <Sparkles className="h-4 w-4" />
            <span>Descubrir Compañeras</span>
          </Link>
        </div>
      )}
    </div>
  );
}

