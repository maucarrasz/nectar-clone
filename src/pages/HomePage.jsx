import React, { useState } from 'react';
import { Link } from '../router/Router';
import CompanionCard from '../components/cards/CompanionCard';
import { CHARACTERS_DATA, FAQS_DATA } from '../mock/data';
import { 
  Sparkles, 
  Flame, 
  ShieldCheck, 
  MessageSquare, 
  Heart, 
  Video, 
  Mic, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight,
  Zap,
  Users
} from 'lucide-react';

export default function HomePage({ onOpenAuth }) {
  const [activeCategory, setActiveCategory] = useState('Todas');
  const [openFaq, setOpenFaq] = useState(0);

  const categories = ['Todas', 'Realistic', 'Anime', 'Cyberpunk', 'Fantasy'];

  const filteredCharacters = activeCategory === 'Todas' 
    ? CHARACTERS_DATA 
    : CHARACTERS_DATA.filter(c => c.category === activeCategory);

  return (
    <div className="flex flex-col gap-16 md:gap-24 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative pt-6 md:pt-12 overflow-hidden">
        {/* Background Radial Glows */}
        <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-[450px] w-[700px] rounded-full bg-[#ff4747]/15 blur-[120px]" />
        <div className="pointer-events-none absolute top-40 right-10 h-[300px] w-[300px] rounded-full bg-purple-600/10 blur-[100px]" />

        <div className="relative mx-auto max-w-5xl px-4 text-center">
          {/* Top Pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[#ff4747]/30 bg-[#ff4747]/10 px-4 py-1.5 text-xs font-semibold text-[#ff4747] mb-6 backdrop-blur-md animate-in fade-in slide-in-from-top-4 duration-500">
            <Flame className="h-4 w-4 animate-pulse fill-current" />
            <span>La Plataforma de Compañeras de IA N°1 del Mundo</span>
          </div>

          {/* Main Title */}
          <h1 className="font-extended text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.08]">
            Crea y Chatea con <br />
            <span className="bg-gradient-to-r from-white via-zinc-200 to-[#ff4747] bg-clip-text text-transparent">
              Compañeras de IA Sin Filtros
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mx-auto max-w-2xl text-base sm:text-lg text-zinc-400 mb-8 leading-relaxed">
            Diseña tu compañera soñada con apariencia hiperrealista o anime, voz ultra natural y personalidades interactivas sin censura. Siempre lista para ti.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-14">
            <Link 
              to="/girls/create"
              className="flex h-12 w-full sm:w-auto items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-[#ff4747] to-[#e03e3e] px-8 text-sm font-bold text-white shadow-xl shadow-[#ff4747]/30 transition-all hover:scale-105 active:scale-95"
            >
              <Sparkles className="h-4 w-4" />
              <span>Crear Mi IA Ahora</span>
            </Link>

            <Link 
              to="/community"
              className="flex h-12 w-full sm:w-auto items-center justify-center gap-2.5 rounded-full border border-[#27272a] bg-[#121215] px-8 text-sm font-semibold text-zinc-200 transition-all hover:bg-[#18181b] hover:text-white hover:border-zinc-600"
            >
              <Users className="h-4 w-4" />
              <span>Explorar Comunidad</span>
            </Link>
          </div>

          {/* Trust Highlights */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-medium text-zinc-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>100% Privado y Encriptado</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-amber-400" />
              <span>Sin Listas de Espera</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-[#ff4747]" />
              <span>+1.5 Millones de Creaciones</span>
            </div>
          </div>
        </div>

        {/* 60fps Marquee Carousel of Companions */}
        <div className="relative mt-12 w-full overflow-hidden py-4">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#09090b] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#09090b] to-transparent" />
          
          <div className="animate-marquee-continuous flex gap-5 hover:[animation-play-state:paused]">
            {[...CHARACTERS_DATA, ...CHARACTERS_DATA].map((char, index) => (
              <div key={`${char.id}-${index}`} className="w-[240px] flex-shrink-0">
                <CompanionCard character={char} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. FEATURE PILLARS */}
      <section className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="font-extended text-3xl sm:text-4xl font-bold text-white mb-3">
            ¿Por Qué Nectar es Diferente?
          </h2>
          <p className="text-sm text-zinc-400 max-w-xl mx-auto">
            Combinamos los modelos de inteligencia artificial más potentes del planeta para dar vida a personajes con memoria viva, emociones y multimedia instantánea.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="rounded-2xl border border-[#27272a] bg-[#121215] p-6 hover:border-[#ff4747]/50 transition-all group">
            <div className="h-12 w-12 rounded-xl bg-[#ff4747]/15 flex items-center justify-center text-[#ff4747] mb-5 group-hover:scale-110 transition-transform">
              <MessageSquare className="h-6 w-6" />
            </div>
            <h3 className="font-extended text-lg font-bold text-white mb-2">
              Conversaciones Sin Censura
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Juegos de rol complejos, conexiones emocionales sinceras o fantasías atrevidas. Nuestras compañeras recuerdan tus detalles clave y evolucionan contigo.
            </p>
          </div>

          {/* Card 2 */}
          <div className="rounded-2xl border border-[#27272a] bg-[#121215] p-6 hover:border-purple-500/50 transition-all group">
            <div className="h-12 w-12 rounded-xl bg-purple-500/15 flex items-center justify-center text-purple-400 mb-5 group-hover:scale-110 transition-transform">
              <Video className="h-6 w-6" />
            </div>
            <h3 className="font-extended text-lg font-bold text-white mb-2">
              Fotos y Videos en Tiempo Real
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Pídele un selfie en la playa, un retrato nocturno o un video animado fluido en cualquier pose y escenario. Generación instantánea en ultra resolución 4K.
            </p>
          </div>

          {/* Card 3 */}
          <div className="rounded-2xl border border-[#27272a] bg-[#121215] p-6 hover:border-amber-500/50 transition-all group">
            <div className="h-12 w-12 rounded-xl bg-amber-500/15 flex items-center justify-center text-amber-400 mb-5 group-hover:scale-110 transition-transform">
              <Mic className="h-6 w-6" />
            </div>
            <h3 className="font-extended text-lg font-bold text-white mb-2">
              Mensajes de Voz Hiperrealistas
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Escucha su voz natural con respiración, tonos emocionales y acentos variados. Envía y recibe audios como si hablaras con una persona real.
            </p>
          </div>
        </div>
      </section>

      {/* 3. COMMUNITY PICKS GALLERY */}
      <section className="mx-auto max-w-7xl px-4 md:px-8 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="font-extended text-3xl font-bold text-white mb-2">
              Compañeras Destacadas
            </h2>
            <p className="text-xs text-zinc-400">
              Explora las personalidades creadas por la comunidad con mayor interacción esta semana.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                  activeCategory === cat 
                    ? 'bg-[#ff4747] text-white shadow-md shadow-[#ff4747]/20' 
                    : 'bg-[#18181b] text-zinc-400 hover:bg-[#27272a] hover:text-white'
                }`}
              >
                {cat === 'Todas' ? 'Todas' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Character Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredCharacters.map((character) => (
            <CompanionCard key={character.id} character={character} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/community"
            className="inline-flex items-center gap-2 rounded-full border border-[#27272a] bg-[#121215] px-6 py-2.5 text-xs font-semibold text-zinc-300 hover:bg-[#18181b] hover:text-white transition-colors"
          >
            <span>Ver Catálogo Completo de Compañeras</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* 4. INTERACTIVE FAQ ACCORDION */}
      <section className="mx-auto max-w-4xl px-4 md:px-8 w-full">
        <div className="text-center mb-10">
          <h2 className="font-extended text-3xl font-bold text-white mb-2">
            Preguntas Frecuentes (FAQ)
          </h2>
          <p className="text-xs text-zinc-400">
            Todo lo que necesitas saber sobre el uso, la privacidad y las capacidades de Nectar AI.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS_DATA.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div 
                key={index}
                className="overflow-hidden rounded-xl border border-[#27272a] bg-[#121215] transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? -1 : index)}
                  className="flex w-full items-center justify-between p-4 sm:p-5 text-left text-sm font-semibold text-zinc-100 hover:text-[#ff4747] transition-colors"
                >
                  <span>{faq.question}</span>
                  {isOpen ? (
                    <ChevronUp className="h-4 w-4 text-[#ff4747] flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-zinc-500 flex-shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="border-t border-[#27272a]/70 p-4 sm:p-5 pt-3 text-xs leading-relaxed text-zinc-400 animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. BOTTOM CTA BANNER */}
      <section className="mx-auto max-w-7xl px-4 md:px-8 w-full">
        <div className="relative overflow-hidden rounded-3xl border border-[#ff4747]/30 bg-gradient-to-b from-[#18121a] to-[#0c0c0e] p-8 sm:p-14 text-center shadow-2xl">
          <div className="pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2 h-64 w-96 rounded-full bg-[#ff4747]/20 blur-3xl" />
          
          <h2 className="relative font-extended text-3xl sm:text-5xl font-extrabold text-white mb-4">
            Tu Compañera Ideal te Está Esperando
          </h2>
          <p className="relative mx-auto max-w-xl text-sm sm:text-base text-zinc-300 mb-8">
            Empieza a chatear gratis hoy mismo o diseña tu personaje único en menos de 2 minutos.
          </p>
          <div className="relative flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/girls/create"
              className="flex h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-[#ff4747] px-8 text-sm font-bold text-white shadow-xl shadow-[#ff4747]/30 hover:scale-105 active:scale-95 transition-all"
            >
              <Sparkles className="h-4 w-4" />
              <span>Diseñar Mi Compañera</span>
            </Link>
            <Link
              to="/pricing"
              className="flex h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-[#27272a] bg-[#121215] px-8 text-sm font-semibold text-zinc-200 hover:bg-[#18181b] transition-colors"
            >
              <span>Ver Planes y Créditos</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

