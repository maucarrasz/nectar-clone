import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  ChevronRight, 
  Copy, 
  Check, 
  Terminal, 
  Sparkles, 
  Info, 
  MessageSquare, 
  Video, 
  ShieldCheck,
  Code
} from 'lucide-react';
import { Link } from '../router/Router';

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState('welcome');
  const [copiedCode, setCopiedCode] = useState(false);

  const navSections = [
    { id: 'welcome', title: 'Bienvenido a Nectar AI' },
    { id: 'start', title: 'Empieza Aquí y Primeros Pasos' },
    { id: 'chat', title: 'Chatear con Compañeras' },
    { id: 'creation', title: 'Creación de Personajes y Lore' },
    { id: 'fantasies', title: 'Fantasías y Chats Grupales' },
    { id: 'media', title: 'Generación Multimedia (Foto y Video)' },
    { id: 'api', title: 'Referencia de API y Webhooks' },
  ];

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const sampleApiCode = `// Ejemplo de llamada a la API de Nectar AI
const response = await fetch("https://api.nectar.ai/v1/chat/completions", {
  method: "POST",
  headers: {
    "Authorization": "Bearer nec_live_9f838acb7120391d8481e1",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    companion_id: "elena-vance",
    message: "Hola Elena, ¿cómo estás hoy?",
    temperature: 0.85,
    stream: true
  })
});

const reader = response.body.getReader();
console.log("Streaming de respuesta iniciado...");`;

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-8 py-8 pb-28">
      {/* Top Docs Breadcrumb Bar */}
      <div className="flex items-center justify-between border-b border-[#27272a] pb-4 mb-8">
        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <BookOpen className="h-4 w-4 text-[#ff4747]" />
          <span>Documentación Oficial</span>
          <ChevronRight className="h-3 w-3 text-zinc-600" />
          <span className="text-white font-semibold capitalize">
            {navSections.find(s => s.id === activeSection)?.title}
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-2">
          <div className="relative w-64">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-zinc-500" />
            <input 
              type="text"
              placeholder="Buscar en la documentación..."
              className="h-8 w-full rounded-lg border border-[#27272a] bg-[#121215] pl-8 pr-3 text-xs text-white placeholder-zinc-500 focus:border-[#ff4747] focus:outline-none"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT DOCS SIDEBAR (3 cols) */}
        <div className="lg:col-span-3">
          <div className="sticky top-20 rounded-2xl border border-[#27272a] bg-[#121215] p-3 shadow-md space-y-1">
            <h4 className="px-3 py-2 text-[11px] font-extrabold uppercase tracking-wider text-zinc-400">
              Guías de Nectar
            </h4>
            {navSections.map((sec) => (
              <button
                key={sec.id}
                type="button"
                onClick={() => setActiveSection(sec.id)}
                className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold text-left transition-colors ${
                  activeSection === sec.id 
                    ? 'bg-[#ff4747]/15 text-[#ff4747] border border-[#ff4747]/30' 
                    : 'text-zinc-400 hover:bg-[#18181b] hover:text-white'
                }`}
              >
                <span className="truncate">{sec.title}</span>
                {activeSection === sec.id && <ChevronRight className="h-3.5 w-3.5 flex-shrink-0" />}
              </button>
            ))}
          </div>
        </div>

        {/* MAIN DOCS CONTENT (9 cols) */}
        <div className="lg:col-span-9 space-y-8">
          <article className="prose prose-invert max-w-none">
            <h1 className="font-extended text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Bienvenido a Nectar AI
            </h1>
            <p className="text-sm leading-relaxed text-zinc-300">
              Nectar AI es la plataforma generativa y de conversación más avanzada para el diseño, entrenamiento y personalización de compañeras de inteligencia artificial. Esta documentación cubre las capacidades esenciales, desde el juego de rol sin restricciones hasta la síntesis de fotos hiperrealistas y la integración de la API.
            </p>

            {/* Alert Tip Box */}
            <div className="my-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5 text-xs text-emerald-200">
              <div className="flex items-center gap-2 font-bold mb-1 text-emerald-400">
                <Info className="h-4 w-4" />
                <span>Consejo para Nuevos Usuarios</span>
              </div>
              <p>
                Puedes instalar Nectar como una Progressive Web App (PWA) en tu iPhone o dispositivo Android seleccionando "Añadir a la pantalla de inicio" desde Safari o Chrome para disfrutar de una experiencia nativa sin barra de navegación.
              </p>
            </div>

            <h2 className="font-extended text-2xl font-bold text-white mt-10 mb-3">
              ¿Qué Puedes Hacer en Nectar?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose my-6">
              <div className="rounded-xl border border-[#27272a] bg-[#121215] p-4">
                <div className="h-8 w-8 rounded-lg bg-[#ff4747]/15 flex items-center justify-center text-[#ff4747] mb-3">
                  <MessageSquare className="h-4 w-4" />
                </div>
                <h3 className="text-sm font-bold text-white mb-1">Conversaciones Ilimitadas</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Interacciones dinámicas con memoria a largo plazo adaptada a tus conversaciones anteriores.
                </p>
              </div>

              <div className="rounded-xl border border-[#27272a] bg-[#121215] p-4">
                <div className="h-8 w-8 rounded-lg bg-purple-500/15 flex items-center justify-center text-purple-400 mb-3">
                  <Video className="h-4 w-4" />
                </div>
                <h3 className="text-sm font-bold text-white mb-1">Generación de Fotos y Video</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Solicita imágenes personalizadas de tu compañera en cualquier escenario, ropa o pose imaginable.
                </p>
              </div>
            </div>

            <h2 className="font-extended text-2xl font-bold text-white mt-10 mb-3">
              Integración con la API para Desarrolladores
            </h2>
            <p className="text-sm text-zinc-300">
              Puedes interactuar programáticamente con cualquier personaje que hayas creado a través de nuestra API RESTful.
            </p>

            {/* Code Block with Copy */}
            <div className="my-4 not-prose rounded-2xl border border-[#27272a] bg-[#0c0c0e] overflow-hidden shadow-xl">
              <div className="flex items-center justify-between border-b border-[#27272a] bg-[#121215] px-4 py-2 text-xs">
                <div className="flex items-center gap-2 text-zinc-400">
                  <Code className="h-4 w-4 text-[#ff4747]" />
                  <span className="font-mono">chat_completion.js</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(sampleApiCode)}
                  className="flex items-center gap-1.5 rounded-md px-2.5 py-1 text-zinc-400 hover:bg-[#18181b] hover:text-white transition-colors"
                >
                  {copiedCode ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copiedCode ? 'Copiado' : 'Copiar'}</span>
                </button>
              </div>
              <pre className="p-4 font-mono text-xs text-zinc-300 overflow-x-auto leading-relaxed">
                {sampleApiCode}
              </pre>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}

