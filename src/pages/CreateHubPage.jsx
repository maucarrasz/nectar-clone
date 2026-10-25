import React, { useState } from 'react';
import { 
  Sparkles, 
  Image as ImageIcon, 
  Video, 
  Sliders, 
  Download, 
  Heart, 
  Maximize2,
  Zap,
  Flame,
  Check,
  RefreshCw
} from 'lucide-react';

export default function CreateHubPage() {
  const [activeTab, setActiveTab] = useState('image'); // 'image' | 'video'
  const [prompt, setPrompt] = useState('Retrato de estudio de una joven elegante de cabello castaño ondulado, ojos verdes, vestida con un top de seda negra, iluminación cinematográfica suave, 8k, hiperrealista');
  const [aspectRatio, setAspectRatio] = useState('9:16');
  const [stylePreset, setStylePreset] = useState('Realista');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedGallery, setGeneratedGallery] = useState([
    {
      id: 1,
      url: '/assets/asset_XzI3YzZmNzkzMDBf.webp',
      prompt: 'Retrato de estudio de Elena Vance',
      ratio: '9:16',
      likes: 24,
      isLiked: false,
    },
    {
      id: 2,
      url: '/assets/heart_logo.webp',
      prompt: 'Logo Nectar Rediseño Neón',
      ratio: '1:1',
      likes: 89,
      isLiked: true,
    }
  ]);

  const styles = ['Realista', 'Anime XL', 'Cinemático', 'Cyberpunk', 'Fantasía Gótica'];
  const ratios = [
    { label: 'Vertical (9:16)', value: '9:16', icon: '📱' },
    { label: 'Cuadrado (1:1)', value: '1:1', icon: '⏹️' },
    { label: 'Horizontal (16:9)', value: '16:9', icon: '🖥️' },
  ];

  const handleGenerate = (e) => {
    e.preventDefault();
    if (!prompt.trim() || isGenerating) return;

    setIsGenerating(true);
    setTimeout(() => {
      const newCreation = {
        id: Date.now(),
        url: '/assets/asset_XzI3YzZmNzkzMDBf.webp',
        prompt: prompt,
        ratio: aspectRatio,
        likes: 1,
        isLiked: false,
      };
      setGeneratedGallery(prev => [newCreation, ...prev]);
      setIsGenerating(false);
    }, 2000);
  };

  const handleEnhancePrompt = () => {
    setPrompt(prev => prev + ', iluminación volumétrica de rayos de sol, bokeh suave, textura de piel ultra detallada, obra maestra fotográfica');
  };

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-8 py-6 md:py-10 pb-24">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 rounded-full bg-[#ff4747]/10 px-3 py-1 text-xs font-semibold text-[#ff4747] mb-2">
          <Zap className="h-3.5 w-3.5" />
          <span>Estudio de Creación Multimedia</span>
        </div>
        <h1 className="font-extended text-3xl sm:text-4xl font-extrabold text-white">
          Generar Fotos y Videos con IA
        </h1>
        <p className="text-sm text-zinc-400 mt-1">
          Crea imágenes en ultra definición o anima clips de video con los modelos más avanzados de Nectar.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT COLUMN: Controls Form (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="rounded-2xl border border-[#27272a] bg-[#121215] p-5 shadow-lg">
            {/* Type selector tabs */}
            <div className="flex rounded-xl bg-[#18181b] p-1 mb-5">
              <button
                type="button"
                onClick={() => setActiveTab('image')}
                className={`flex-1 flex items-center justify-center gap-2 rounded-lg py-2 text-xs font-bold transition-all ${
                  activeTab === 'image' ? 'bg-[#ff4747] text-white shadow' : 'text-zinc-400 hover:text-white'
                }`}
              >
                <ImageIcon className="h-4 w-4" />
                <span>Generar Foto</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('video')}
                className={`flex-1 flex items-center justify-center gap-2 rounded-lg py-2 text-xs font-bold transition-all ${
                  activeTab === 'video' ? 'bg-[#ff4747] text-white shadow' : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Video className="h-4 w-4" />
                <span>Generar Video</span>
              </button>
            </div>

            {/* Prompt input */}
            <div className="mb-5">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-zinc-300">Descripción del Prompt</label>
                <button
                  type="button"
                  onClick={handleEnhancePrompt}
                  className="flex items-center gap-1 text-[11px] font-semibold text-[#ff4747] hover:underline"
                >
                  <Sparkles className="h-3 w-3" />
                  <span>Mejorar con IA</span>
                </button>
              </div>
              <textarea
                rows={4}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe la escena, atuendo, expresión, iluminación..."
                className="w-full rounded-xl border border-[#27272a] bg-[#18181b] p-3 text-xs text-white placeholder-zinc-500 focus:border-[#ff4747] focus:outline-none focus:ring-1 focus:ring-[#ff4747]"
              />
            </div>

            {/* Aspect Ratio */}
            <div className="mb-5">
              <label className="block text-xs font-semibold text-zinc-300 mb-2">Relación de Aspecto</label>
              <div className="grid grid-cols-3 gap-2">
                {ratios.map((r) => (
                  <button
                    key={r.value}
                    type="button"
                    onClick={() => setAspectRatio(r.value)}
                    className={`flex flex-col items-center justify-center rounded-xl border p-2.5 text-xs transition-all ${
                      aspectRatio === r.value 
                        ? 'border-[#ff4747] bg-[#ff4747]/10 text-white font-bold' 
                        : 'border-[#27272a] bg-[#18181b] text-zinc-400 hover:bg-[#27272a] hover:text-white'
                    }`}
                  >
                    <span className="text-base mb-1">{r.icon}</span>
                    <span className="text-[11px]">{r.value}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Style Presets */}
            <div className="mb-6">
              <label className="block text-xs font-semibold text-zinc-300 mb-2">Estilo Visual</label>
              <div className="flex flex-wrap gap-2">
                {styles.map((style) => (
                  <button
                    key={style}
                    type="button"
                    onClick={() => setStylePreset(style)}
                    className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
                      stylePreset === style 
                        ? 'bg-zinc-100 text-black font-bold' 
                        : 'bg-[#18181b] text-zinc-400 border border-[#27272a] hover:text-white'
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <button
              type="button"
              onClick={handleGenerate}
              disabled={isGenerating || !prompt.trim()}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#ff4747] to-[#e03e3e] text-sm font-bold text-white shadow-lg shadow-[#ff4747]/25 transition-all hover:brightness-110 active:scale-95 disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span>Generando obra maestra...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  <span>Generar ({activeTab === 'video' ? '5 Créditos' : '2 Créditos'})</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: Gallery & Outputs (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="rounded-2xl border border-[#27272a] bg-[#121215] p-5 shadow-lg min-h-[500px]">
            <div className="flex items-center justify-between mb-4 border-b border-[#27272a] pb-3">
              <h3 className="font-extended text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-[#ff4747]" />
                <span>Tus Creaciones Recientes</span>
              </h3>
              <span className="text-xs text-zinc-400">{generatedGallery.length} Resultados</span>
            </div>

            {/* Generating placeholder if active */}
            {isGenerating && (
              <div className="mb-4 flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#ff4747]/50 bg-[#ff4747]/5 p-12 text-center animate-pulse">
                <RefreshCw className="h-10 w-10 text-[#ff4747] animate-spin mb-3" />
                <p className="text-sm font-bold text-white">Sintetizando redes neuronales...</p>
                <p className="text-xs text-zinc-400 mt-1">Renderizando texturas en alta resolución</p>
              </div>
            )}

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {generatedGallery.map((item) => (
                <div 
                  key={item.id}
                  className="group relative overflow-hidden rounded-xl border border-[#27272a] bg-black/60 transition-all hover:border-[#ff4747]"
                >
                  <img 
                    src={item.url} 
                    alt={item.prompt} 
                    className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-between">
                    <div className="flex justify-end">
                      <button 
                        type="button" 
                        className="rounded-full bg-black/60 p-2 text-white hover:bg-black/90 transition-colors"
                        title="Ver en grande"
                      >
                        <Maximize2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <div>
                      <p className="text-xs text-zinc-200 line-clamp-2 mb-2">{item.prompt}</p>
                      <div className="flex items-center justify-between">
                        <span className="rounded bg-black/60 px-2 py-0.5 text-[10px] text-zinc-400">{item.ratio}</span>
                        <a 
                          href={item.url} 
                          download="nectar-creation.webp"
                          className="flex items-center gap-1 rounded bg-[#ff4747] px-2 py-1 text-[11px] font-semibold text-white hover:brightness-110"
                        >
                          <Download className="h-3 w-3" />
                          <span>Descargar</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

