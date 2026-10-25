import React, { useState } from 'react';
import { useRouter } from '../router/Router';
import { 
  Sparkles, 
  Video, 
  User, 
  Heart, 
  Volume2, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle2,
  Play,
  Flame,
  Check
} from 'lucide-react';

export default function CompanionCreatePage() {
  const { navigate } = useRouter();

  // Wizard step: 1 (Starting Point), 2 (Physical), 3 (Personality), 4 (Voice & Name)
  const [step, setStep] = useState(1);

  // Form State
  const [formData, setFormData] = useState({
    style: 'Realista',
    ethnicity: 'Latina',
    eyeColor: 'Verdes',
    hairColor: 'Castaño Oscuro',
    hairStyle: 'Largo Ondulado',
    bodyType: 'Reloj de Arena',
    personality: 'Cariñosa y Dulce',
    name: 'Sofia Valdés',
    bio: 'Una chica apasionada por la fotografía, el café por las mañanas y las conversaciones íntimas.',
    greeting: '¡Hola cariño! Qué alegría que por fin estés aquí. Estaba deseando conocerte...',
    voice: 'Sofia (Cálida y Sensual)',
  });

  const ethnicities = ['Latina', 'Caucásica', 'Asiática', 'Afrodescendiente', 'Medio Oriente'];
  const bodyTypes = ['Delgada', 'Reloj de Arena', 'Atlética', 'Curvy / Voluptuosa'];
  const personalities = [
    'Cariñosa y Dulce',
    'Dominante y Segura',
    'Tímida (Dandere)',
    'Obsesiva (Yandere)',
    'Rebelde y Burlona (Tsundere)',
    'Intelectual y Misteriosa'
  ];
  const voices = [
    { name: 'Sofia (Cálida y Sensual)', desc: 'Tono cercano, suave y reconfortante' },
    { name: 'Elena (Dulce y Juvenil)', desc: 'Tono alegre, brillante y risueño' },
    { name: 'Valeria (Elegante y Madura)', desc: 'Tono profundo, seguro y envolvente' },
    { name: 'Sakura (Anime Juguetona)', desc: 'Tono entusiasta con toques tiernos' },
  ];

  const handleFinish = () => {
    alert(`¡Compañera ${formData.name} creada con éxito! Redirigiendo al chat...`);
    navigate('/messages');
  };

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-8 py-8 pb-24">
      {/* Title */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-[#ff4747]/10 px-3 py-1 text-xs font-semibold text-[#ff4747] mb-2">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Asistente de Creación 100% Personalizado</span>
        </div>
        <h1 className="font-extended text-3xl sm:text-5xl font-extrabold text-white">
          Crea tu Compañera de IA
        </h1>
        <p className="text-sm text-zinc-400 mt-1 max-w-2xl">
          Elige cada rasgo físico, personalidad, tono de voz y mensaje de bienvenida. La IA adaptará sus respuestas a tus preferencias exactas.
        </p>
      </div>

      {/* Stepper Progress */}
      <div className="mb-8 flex items-center gap-2 max-w-xl">
        {[
          { num: 1, label: 'Punto de Inicio' },
          { num: 2, label: 'Aspecto Físico' },
          { num: 3, label: 'Personalidad' },
          { num: 4, label: 'Voz y Saludo' },
        ].map((s) => (
          <div key={s.num} className="flex-1 flex flex-col gap-1">
            <div 
              className={`h-1.5 rounded-full transition-all ${
                step >= s.num ? 'bg-[#ff4747]' : 'bg-[#27272a]'
              }`} 
            />
            <span className={`text-[10px] font-semibold truncate ${step >= s.num ? 'text-white' : 'text-zinc-500'}`}>
              {s.num}. {s.label}
            </span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT COLUMN: Wizard Steps (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="rounded-2xl border border-[#27272a] bg-[#121215] p-6 shadow-xl">
            {/* STEP 1: Starting Point */}
            {step === 1 && (
              <div className="space-y-6">
                <h3 className="font-extended text-lg font-bold text-white mb-1">
                  Elige el Punto de Partida
                </h3>
                <p className="text-xs text-zinc-400">
                  Selecciona cómo te gustaría iniciar la creación de tu compañera.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Option 1: Video Reference 1 */}
                  <div 
                    onClick={() => setFormData({ ...formData, style: 'Realista' })}
                    className={`cursor-pointer overflow-hidden rounded-xl border p-4 transition-all ${
                      formData.style === 'Realista' 
                        ? 'border-[#ff4747] bg-[#ff4747]/5 ring-1 ring-[#ff4747]' 
                        : 'border-[#27272a] bg-[#18181b] hover:border-zinc-500'
                    }`}
                  >
                    <div className="relative aspect-video rounded-lg overflow-hidden mb-3 bg-black">
                      <video 
                        src="/assets/create_my_ai.mp4" 
                        autoPlay 
                        loop 
                        muted 
                        playsInline 
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-white">Estilo Ultra-Realista</span>
                      {formData.style === 'Realista' && <Check className="h-4 w-4 text-[#ff4747]" />}
                    </div>
                    <p className="text-xs text-zinc-400 mt-1">Fotografías con calidad de cámara profesional y texturas naturales.</p>
                  </div>

                  {/* Option 2: Video Reference 2 */}
                  <div 
                    onClick={() => setFormData({ ...formData, style: 'Anime' })}
                    className={`cursor-pointer overflow-hidden rounded-xl border p-4 transition-all ${
                      formData.style === 'Anime' 
                        ? 'border-[#ff4747] bg-[#ff4747]/5 ring-1 ring-[#ff4747]' 
                        : 'border-[#27272a] bg-[#18181b] hover:border-zinc-500'
                    }`}
                  >
                    <div className="relative aspect-video rounded-lg overflow-hidden mb-3 bg-black">
                      <video 
                        src="/assets/photo_reference.mp4" 
                        autoPlay 
                        loop 
                        muted 
                        playsInline 
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-white">Estilo Anime / Ilustración</span>
                      {formData.style === 'Anime' && <Check className="h-4 w-4 text-[#ff4747]" />}
                    </div>
                    <p className="text-xs text-zinc-400 mt-1">Ilustración de alta fidelidad, personajes 2D/2.5D llenos de expresividad.</p>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Physical Attributes */}
            {step === 2 && (
              <div className="space-y-5">
                <h3 className="font-extended text-lg font-bold text-white">
                  Rasgos Físicos y Apariencia
                </h3>

                {/* Ethnicity */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-2">Etnia / Origen</label>
                  <div className="flex flex-wrap gap-2">
                    {ethnicities.map((eth) => (
                      <button
                        key={eth}
                        type="button"
                        onClick={() => setFormData({ ...formData, ethnicity: eth })}
                        className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                          formData.ethnicity === eth 
                            ? 'bg-[#ff4747] text-white' 
                            : 'bg-[#18181b] text-zinc-400 border border-[#27272a] hover:text-white'
                        }`}
                      >
                        {eth}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Body Type */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-2">Tipo de Cuerpo</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {bodyTypes.map((bt) => (
                      <button
                        key={bt}
                        type="button"
                        onClick={() => setFormData({ ...formData, bodyType: bt })}
                        className={`rounded-xl border p-2.5 text-center text-xs font-semibold transition-all ${
                          formData.bodyType === bt 
                            ? 'border-[#ff4747] bg-[#ff4747]/10 text-white' 
                            : 'border-[#27272a] bg-[#18181b] text-zinc-400 hover:text-white'
                        }`}
                      >
                        {bt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Hair & Eyes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Color de Ojos</label>
                    <select
                      value={formData.eyeColor}
                      onChange={(e) => setFormData({ ...formData, eyeColor: e.target.value })}
                      className="h-10 w-full rounded-xl border border-[#27272a] bg-[#18181b] px-3 text-xs text-white focus:border-[#ff4747] focus:outline-none"
                    >
                      <option>Verdes Esmeralda</option>
                      <option>Azules Profundos</option>
                      <option>Castaños Cálidos</option>
                      <option>Miel / Ámbar</option>
                      <option>Violetas / Místicos</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Color de Cabello</label>
                    <select
                      value={formData.hairColor}
                      onChange={(e) => setFormData({ ...formData, hairColor: e.target.value })}
                      className="h-10 w-full rounded-xl border border-[#27272a] bg-[#18181b] px-3 text-xs text-white focus:border-[#ff4747] focus:outline-none"
                    >
                      <option>Castaño Oscuro</option>
                      <option>Rubio Dorado</option>
                      <option>Negro Azabache</option>
                      <option>Pelirrojo / Cobrizo</option>
                      <option>Platinado / Blanco</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: Personality & Archetype */}
            {step === 3 && (
              <div className="space-y-5">
                <h3 className="font-extended text-lg font-bold text-white">
                  Personalidad y Arquetipo
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {personalities.map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setFormData({ ...formData, personality: p })}
                      className={`flex items-center justify-between rounded-xl border p-3.5 text-left text-xs font-semibold transition-all ${
                        formData.personality === p 
                          ? 'border-[#ff4747] bg-[#ff4747]/10 text-white ring-1 ring-[#ff4747]' 
                          : 'border-[#27272a] bg-[#18181b] text-zinc-400 hover:text-white'
                      }`}
                    >
                      <span>{p}</span>
                      {formData.personality === p && <Check className="h-4 w-4 text-[#ff4747]" />}
                    </button>
                  ))}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Nombre del Personaje</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="h-10 w-full rounded-xl border border-[#27272a] bg-[#18181b] px-3 text-sm text-white focus:border-[#ff4747] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Biografía o Trasfondo</label>
                  <textarea
                    rows={3}
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    className="w-full rounded-xl border border-[#27272a] bg-[#18181b] p-3 text-xs text-white focus:border-[#ff4747] focus:outline-none"
                  />
                </div>
              </div>
            )}

            {/* STEP 4: Voice & Greeting */}
            {step === 4 && (
              <div className="space-y-5">
                <h3 className="font-extended text-lg font-bold text-white">
                  Voz y Mensaje de Inicio
                </h3>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-2">Selecciona su Voz</label>
                  <div className="space-y-2">
                    {voices.map((v) => (
                      <div
                        key={v.name}
                        onClick={() => setFormData({ ...formData, voice: v.name })}
                        className={`flex items-center justify-between rounded-xl border p-3 cursor-pointer transition-all ${
                          formData.voice === v.name 
                            ? 'border-[#ff4747] bg-[#ff4747]/10 text-white' 
                            : 'border-[#27272a] bg-[#18181b] text-zinc-400 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <button 
                            type="button" 
                            className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ff4747] text-white"
                          >
                            <Volume2 className="h-4 w-4" />
                          </button>
                          <div>
                            <p className="text-xs font-bold text-white">{v.name}</p>
                            <p className="text-[11px] text-zinc-400">{v.desc}</p>
                          </div>
                        </div>
                        {formData.voice === v.name && <Check className="h-4 w-4 text-[#ff4747]" />}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Primer Mensaje al Abrir el Chat</label>
                  <textarea
                    rows={3}
                    value={formData.greeting}
                    onChange={(e) => setFormData({ ...formData, greeting: e.target.value })}
                    className="w-full rounded-xl border border-[#27272a] bg-[#18181b] p-3 text-xs text-white focus:border-[#ff4747] focus:outline-none"
                  />
                </div>
              </div>
            )}

            {/* Stepper Controls */}
            <div className="mt-8 flex items-center justify-between border-t border-[#27272a] pt-4">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="flex items-center gap-1.5 rounded-xl border border-[#27272a] bg-[#18181b] px-4 py-2 text-xs font-semibold text-zinc-300 hover:bg-[#27272a] hover:text-white"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Anterior</span>
                </button>
              ) : <div />}

              {step < 4 ? (
                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  className="flex items-center gap-1.5 rounded-xl bg-[#ff4747] px-6 py-2 text-xs font-bold text-white shadow-md shadow-[#ff4747]/20 hover:brightness-110"
                >
                  <span>Siguiente Paso</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleFinish}
                  className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#ff4747] to-[#e03e3e] px-8 py-2.5 text-xs font-bold text-white shadow-lg shadow-[#ff4747]/30 hover:scale-105 active:scale-95 transition-all"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>Crear y Empezar a Chatear</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Live Interactive Preview (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="sticky top-20 rounded-2xl border border-[#27272a] bg-[#121215] p-5 shadow-xl">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3 flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-[#ff4747]" />
              <span>Vista Previa en Vivo</span>
            </h3>

            {/* Preview Card */}
            <div className="relative overflow-hidden rounded-xl border border-[#27272a] bg-black">
              <div className="relative aspect-[3/4] w-full">
                <video 
                  src={formData.style === 'Anime' ? '/assets/photo_reference.mp4' : '/assets/create_my_ai.mp4'}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-extended text-lg font-bold">{formData.name}</span>
                    <span className="rounded bg-[#ff4747] px-1.5 py-0.5 text-[9px] font-bold">18+</span>
                  </div>
                  <p className="text-xs text-zinc-300 line-clamp-2 mb-2">{formData.bio}</p>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    <span className="rounded bg-black/60 backdrop-blur-sm px-2 py-0.5 text-[10px] text-zinc-300">
                      {formData.style}
                    </span>
                    <span className="rounded bg-black/60 backdrop-blur-sm px-2 py-0.5 text-[10px] text-zinc-300">
                      {formData.ethnicity}
                    </span>
                    <span className="rounded bg-black/60 backdrop-blur-sm px-2 py-0.5 text-[10px] text-zinc-300">
                      {formData.personality}
                    </span>
                  </div>

                  <div className="rounded-xl bg-black/60 backdrop-blur-sm p-2.5 border border-white/10 text-xs text-zinc-300 italic">
                    "{formData.greeting}"
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

