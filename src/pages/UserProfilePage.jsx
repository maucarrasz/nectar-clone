import React, { useState } from 'react';
import CompanionCard from '../components/cards/CompanionCard';
import { CHARACTERS_DATA } from '../mock/data';
import { 
  User, 
  CheckCircle2, 
  Share2, 
  Sparkles, 
  MessageSquare, 
  Users, 
  Heart,
  Calendar
} from 'lucide-react';

export default function UserProfilePage() {
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState('companions');

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-8 py-6 pb-24">
      {/* 1. PROFILE HEADER CARD */}
      <div className="relative overflow-hidden rounded-3xl border border-[#27272a] bg-[#121215] shadow-xl mb-8">
        {/* Banner */}
        <div className="h-44 sm:h-64 w-full bg-gradient-to-r from-purple-900/60 via-[#ff4747]/30 to-black relative">
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* User Info Bar */}
        <div className="p-6 sm:p-8 pt-0 relative flex flex-col sm:flex-row sm:items-end justify-between gap-6 -mt-16 sm:-mt-20">
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5 text-center sm:text-left">
            {/* Avatar */}
            <div className="relative h-28 w-28 sm:h-36 sm:w-36 rounded-3xl overflow-hidden border-4 border-[#121215] bg-black shadow-2xl flex-shrink-0">
              <img 
                src="/assets/heart_logo.webp" 
                alt="Avatar Creador" 
                className="h-full w-full object-cover p-3 bg-gradient-to-tr from-[#18181b] to-[#27272a]"
              />
            </div>

            {/* Names & Bio */}
            <div>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
                <h1 className="font-extended text-2xl sm:text-3xl font-extrabold text-white">
                  Alex Vance
                </h1>
                <span className="flex items-center gap-1 rounded-full bg-purple-500/20 px-2.5 py-0.5 text-xs font-bold text-purple-400">
                  <CheckCircle2 className="h-3.5 w-3.5 fill-current" /> Creador Verificado
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-mono mb-2">@username</p>
              <p className="text-xs sm:text-sm text-zinc-300 max-w-lg leading-relaxed">
                Diseñador de mundos de rol y compañeras con inteligencia emocional profunda en Nectar AI. Especializado en estética cyberpunk y realismo cinematográfico.
              </p>

              <div className="flex items-center justify-center sm:justify-start gap-4 text-xs text-zinc-500 mt-3">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" /> Miembro desde Enero 2024
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert('¡Enlace del perfil copiado al portapapeles!');
              }}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#27272a] bg-[#18181b] text-zinc-400 hover:text-white transition-colors"
              title="Compartir perfil"
            >
              <Share2 className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={() => setIsFollowing(!isFollowing)}
              className={`flex h-10 items-center gap-2 rounded-xl px-6 text-xs font-bold transition-all ${
                isFollowing 
                  ? 'border border-[#27272a] bg-[#18181b] text-zinc-300 hover:text-white' 
                  : 'bg-[#ff4747] text-white shadow-lg shadow-[#ff4747]/20 hover:brightness-110'
              }`}
            >
              <Users className="h-4 w-4" />
              <span>{isFollowing ? 'Siguiendo' : 'Seguir a Alex'}</span>
            </button>
          </div>
        </div>

        {/* Metric Badges Strip */}
        <div className="grid grid-cols-3 divide-x divide-[#27272a] border-t border-[#27272a] bg-[#0c0c0e]/80 py-4 text-center">
          <div>
            <p className="font-extended text-lg sm:text-2xl font-extrabold text-white">14.8K</p>
            <p className="text-[11px] text-zinc-400">Seguidores</p>
          </div>
          <div>
            <p className="font-extended text-lg sm:text-2xl font-extrabold text-[#ff4747]">32</p>
            <p className="text-[11px] text-zinc-400">Compañeras Creadas</p>
          </div>
          <div>
            <p className="font-extended text-lg sm:text-2xl font-extrabold text-white">890K</p>
            <p className="text-[11px] text-zinc-400">Chats Totales</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#27272a] mb-8 gap-6">
        <button
          type="button"
          onClick={() => setActiveTab('companions')}
          className={`flex items-center gap-2 pb-3 text-xs font-bold transition-all relative ${
            activeTab === 'companions' ? 'text-[#ff4747]' : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Sparkles className="h-4 w-4" />
          <span>Compañeras Publicadas (6)</span>
          {activeTab === 'companions' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ff4747]" />
          )}
        </button>
      </div>

      {/* Companions Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {CHARACTERS_DATA.map((char) => (
          <CompanionCard key={char.id} character={char} />
        ))}
      </div>
    </div>
  );
}
