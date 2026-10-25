import React, { useState, useRef } from 'react';
import { MessageSquare, Heart, Flame, Sparkles, Play } from 'lucide-react';
import { Link, useRouter } from '../../router/Router';

export default function CompanionCard({ character, onToggleSave, isSaved = false }) {
  const { navigate } = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const [saved, setSaved] = useState(isSaved);
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current && character.video) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handleHeartClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setSaved(!saved);
    if (onToggleSave) onToggleSave(character.id, !saved);
  };

  return (
    <div 
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#27272a] bg-[#121215] transition-all duration-300 hover:-translate-y-1 hover:border-[#ff4747]/60 hover:shadow-xl hover:shadow-[#ff4747]/15"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Media Container */}
      <Link to={`/messages?char=${character.id}`} className="relative aspect-[3/4] w-full overflow-hidden bg-black/40">
        {/* Poster / Image */}
        <img 
          src={character.image || '/assets/asset_XzI3YzZmNzkzMDBf.webp'} 
          alt={character.name}
          className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 ${isHovered && character.video ? 'opacity-0' : 'opacity-100'}`}
          loading="lazy"
        />

        {/* Local Video Preview on Hover */}
        {character.video && (
          <video 
            ref={videoRef}
            src={character.video}
            loop
            muted
            playsInline
            preload="none"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          />
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#121215] via-[#121215]/20 to-transparent opacity-90" />

        {/* Badges Top */}
        <div className="absolute left-3 top-3 flex items-center gap-1.5 z-10">
          {character.isHot && (
            <span className="flex items-center gap-1 rounded-full bg-[#ff4747] px-2 py-0.5 text-[10px] font-bold text-white shadow-md shadow-[#ff4747]/40">
              <Flame className="h-3 w-3 fill-current" /> Hot
            </span>
          )}
          {character.isTrending && (
            <span className="flex items-center gap-1 rounded-full bg-purple-600/90 px-2 py-0.5 text-[10px] font-bold text-white backdrop-blur-sm">
              <Sparkles className="h-3 w-3" /> Tendencia
            </span>
          )}
        </div>

        {/* Heart / Save Button Top Right */}
        <button
          type="button"
          onClick={handleHeartClick}
          className={`absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-md transition-all ${
            saved 
              ? 'bg-[#ff4747] text-white shadow-lg shadow-[#ff4747]/50 scale-110' 
              : 'bg-black/40 text-white/80 hover:bg-black/70 hover:text-white'
          }`}
          title={saved ? 'Quitar de guardados' : 'Guardar en favoritos'}
        >
          <Heart className={`h-4 w-4 ${saved ? 'fill-current' : ''}`} />
        </button>

        {/* Online Indicator & Video Play Badge */}
        {character.video && !isHovered && (
          <div className="absolute bottom-3 right-3 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white/80 backdrop-blur-sm group-hover:opacity-0 transition-opacity">
            <Play className="h-3.5 w-3.5 fill-current ml-0.5" />
          </div>
        )}
      </Link>

      {/* Info Body */}
      <div className="flex flex-1 flex-col justify-between p-3.5 pt-1">
        <div>
          <div className="flex items-center justify-between gap-2 mb-1">
            <Link to={`/messages?char=${character.id}`} className="font-extended text-base font-bold text-white hover:text-[#ff4747] transition-colors truncate">
              {character.name}
            </Link>
            <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-400 flex-shrink-0">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
              Online
            </span>
          </div>

          <p className="line-clamp-2 text-xs text-zinc-400 leading-relaxed mb-3">
            {character.tagline || character.bio}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-3">
            {(character.tags || []).slice(0, 3).map((tag, i) => (
              <span 
                key={i}
                className="rounded-md bg-[#1f1f23] px-2 py-0.5 text-[10px] font-medium text-zinc-300"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Card Footer: Metrics & Chat CTA */}
        <div className="flex items-center justify-between border-t border-[#27272a]/70 pt-2.5 mt-auto">
          <div className="flex items-center gap-2.5 text-[11px] text-zinc-400">
            <span className="flex items-center gap-1">
              <MessageSquare className="h-3 w-3 text-zinc-500" />
              {character.chatsCount}
            </span>
            <span className="flex items-center gap-1">
              <Heart className="h-3 w-3 text-zinc-500" />
              {character.likesCount}
            </span>
          </div>

          <Link
            to={`/messages?char=${character.id}`}
            className="flex items-center gap-1 rounded-lg bg-[#ff4747]/15 px-2.5 py-1 text-xs font-semibold text-[#ff4747] transition-all hover:bg-[#ff4747] hover:text-white"
          >
            <span>Chatear</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

