import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Sparkles, 
  CreditCard, 
  Award, 
  Key, 
  ShieldCheck, 
  Bell, 
  TrendingUp, 
  CheckCircle2,
  Copy,
  Plus
} from 'lucide-react';
import { Link } from '../router/Router';

export default function DashboardPage() {
  const [apiKeyCopied, setApiKeyCopied] = useState(false);

  const badges = [
    { title: 'Pionero Nectar', desc: 'Miembro de la primera generación de usuarios.', icon: '🚀', unlocked: true },
    { title: 'Creador Maestro', desc: 'Más de 10 compañeras creadas con +10k chats.', icon: '👑', unlocked: true },
    { title: 'Narrador Épico', desc: 'Completaste más de 500 mensajes de rol profundo.', icon: '📜', unlocked: true },
    { title: 'Explorador Nocturno', desc: 'Sesión activa de más de 3 horas continuas.', icon: '🌙', unlocked: true },
    { title: 'Voz Dorada', desc: 'Generaste más de 60 minutos de llamadas de audio.', icon: '🎙️', unlocked: false },
    { title: 'Leyenda de la Comunidad', desc: 'Tu compañera alcanzó el top 3 en tendencias.', icon: '🏆', unlocked: false },
  ];

  const handleCopyKey = () => {
    navigator.clipboard.writeText('nec_live_9f838acb7120391d8481e1');
    setApiKeyCopied(true);
    setTimeout(() => setApiKeyCopied(false), 2000);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-8 py-8 pb-24">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-[#ff4747]/10 px-3 py-1 text-xs font-semibold text-[#ff4747] mb-2">
          <LayoutDashboard className="h-3.5 w-3.5" />
          <span>Panel de Usuario & Ajustes</span>
        </div>
        <h1 className="font-extended text-3xl sm:text-4xl font-extrabold text-white">
          Panel de Control
        </h1>
        <p className="text-sm text-zinc-400 mt-1">
          Gestiona tu saldo de créditos, nivel de membresía, estadísticas de uso y claves de acceso.
        </p>
      </div>

      {/* Overview Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Card 1: Credits */}
        <div className="rounded-2xl border border-[#27272a] bg-[#121215] p-5 shadow-md">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-zinc-400">Balance de Créditos</span>
            <div className="h-8 w-8 rounded-lg bg-amber-400/10 flex items-center justify-center text-amber-400">
              <Sparkles className="h-4 w-4" />
            </div>
          </div>
          <p className="font-extended text-3xl font-extrabold text-white mb-2">250 <span className="text-xs font-normal text-zinc-400">/ 2,500</span></p>
          <div className="h-1.5 w-full rounded-full bg-[#27272a] overflow-hidden mb-3">
            <div className="h-full bg-amber-400 w-[10%]" />
          </div>
          <Link
            to="/pricing"
            className="flex items-center justify-center gap-1.5 rounded-lg bg-amber-500/15 py-1.5 text-xs font-bold text-amber-300 hover:bg-amber-500/25 transition-colors"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Recargar Créditos</span>
          </Link>
        </div>

        {/* Card 2: Plan */}
        <div className="rounded-2xl border border-[#27272a] bg-[#121215] p-5 shadow-md">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-zinc-400">Membresía Activa</span>
            <div className="h-8 w-8 rounded-lg bg-[#ff4747]/10 flex items-center justify-center text-[#ff4747]">
              <CreditCard className="h-4 w-4" />
            </div>
          </div>
          <p className="font-extended text-2xl font-extrabold text-white mb-1">Plan Pro</p>
          <p className="text-xs text-zinc-400 mb-4">Renovación automática el 25 Nov 2026</p>
          <Link
            to="/pricing"
            className="flex items-center justify-center rounded-lg border border-[#27272a] bg-[#18181b] py-1.5 text-xs font-bold text-zinc-200 hover:text-white transition-colors"
          >
            Cambiar o Gestionar Plan
          </Link>
        </div>

        {/* Card 3: Images generated */}
        <div className="rounded-2xl border border-[#27272a] bg-[#121215] p-5 shadow-md">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-zinc-400">Fotos Generadas</span>
            <div className="h-8 w-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400">
              <Sparkles className="h-4 w-4" />
            </div>
          </div>
          <p className="font-extended text-3xl font-extrabold text-white mb-1">142</p>
          <p className="text-xs text-emerald-400 flex items-center gap-1">
            <TrendingUp className="h-3.5 w-3.5" /> +28 esta semana
          </p>
        </div>

        {/* Card 4: Audio Calls */}
        <div className="rounded-2xl border border-[#27272a] bg-[#121215] p-5 shadow-md">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-zinc-400">Minutos de Voz</span>
            <div className="h-8 w-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
              <Award className="h-4 w-4" />
            </div>
          </div>
          <p className="font-extended text-3xl font-extrabold text-white mb-1">38 <span className="text-xs font-normal text-zinc-400">min</span></p>
          <p className="text-xs text-zinc-400">Audio sintetizado de alta calidad</p>
        </div>
      </div>

      {/* Badges Section */}
      <div className="mb-10 rounded-2xl border border-[#27272a] bg-[#121215] p-6 shadow-md">
        <h3 className="font-extended text-lg font-bold text-white mb-1 flex items-center gap-2">
          <Award className="h-5 w-5 text-amber-400" />
          <span>Insignias y Logros</span>
        </h3>
        <p className="text-xs text-zinc-400 mb-6">
          Desbloquea recompensas y créditos adicionales interactuando con la plataforma.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {badges.map((b, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-3 rounded-xl border p-4 transition-all ${
                b.unlocked 
                  ? 'border-[#27272a] bg-[#18181b]' 
                  : 'border-[#27272a]/40 bg-[#121215]/40 opacity-50'
              }`}
            >
              <span className="text-2xl">{b.icon}</span>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="text-xs font-bold text-white">{b.title}</h4>
                  {b.unlocked && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />}
                </div>
                <p className="text-[11px] text-zinc-400 mt-0.5 leading-relaxed">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Developer API Keys */}
      <div className="rounded-2xl border border-[#27272a] bg-[#121215] p-6 shadow-md">
        <h3 className="font-extended text-lg font-bold text-white mb-1 flex items-center gap-2">
          <Key className="h-5 w-5 text-[#ff4747]" />
          <span>Claves de API de Nectar</span>
        </h3>
        <p className="text-xs text-zinc-400 mb-5">
          Utiliza tu API Key para integrar tus compañeras en aplicaciones externas, bots de Discord o flujos automáticos.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3 max-w-xl">
          <input
            type="password"
            readOnly
            value="nec_live_9f838acb7120391d8481e1"
            className="h-10 w-full rounded-xl border border-[#27272a] bg-[#18181b] px-3 font-mono text-xs text-zinc-300"
          />
          <button
            type="button"
            onClick={handleCopyKey}
            className="flex h-10 w-full sm:w-auto items-center justify-center gap-1.5 rounded-xl bg-[#ff4747] px-4 text-xs font-bold text-white shadow-md shadow-[#ff4747]/20 hover:brightness-110 flex-shrink-0"
          >
            {apiKeyCopied ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            <span>{apiKeyCopied ? '¡Copiada!' : 'Copiar Key'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

