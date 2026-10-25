import React, { useState } from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  ShieldCheck, 
  Zap, 
  Award, 
  BarChart3, 
  ArrowRight,
  Sparkles,
  Check
} from 'lucide-react';

export default function AffiliatePage() {
  const [referrals, setReferrals] = useState(250);
  const avgSubscription = 19.99;
  const revShareRate = 0.40; // 40%
  const monthlyEarnings = Math.round(referrals * avgSubscription * revShareRate);
  const yearlyEarnings = monthlyEarnings * 12;

  const benefits = [
    {
      title: 'Comisiones de hasta 40% RevShare de por vida',
      desc: 'Gana comisiones recurrentes mes tras mes mientras tus usuarios mantengan su suscripción activa.',
      icon: DollarSign,
    },
    {
      title: 'EPC y Conversiones Líderes en la Industria',
      desc: 'Nuestra tasa de conversión a planes de pago supera el 7.8% gracias a embudos ultra optimizados.',
      icon: TrendingUp,
    },
    {
      title: 'Panel de Analíticas en Tiempo Real',
      desc: 'Monitorea clics, registros, conversiones, tasas de retención y pagos pendientes en un dashboard dedicado.',
      icon: BarChart3,
    },
    {
      title: 'Pagos Semanales Garantizados',
      desc: 'Cobra tus comisiones puntualmente vía Transferencia Bancaria Internacional, Wise, USDT o Bitcoin.',
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-8 py-10 pb-28">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 text-xs font-semibold text-emerald-400 mb-3">
          <TrendingUp className="h-4 w-4" />
          <span>Programa Oficial de Afiliados y Creadores</span>
        </div>
        <h1 className="font-extended text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-4">
          Gana hasta <span className="text-[#ff4747]">40% de RevShare</span> o hasta <span className="text-emerald-400">$40 CPA</span>
        </h1>
        <p className="text-sm sm:text-base text-zinc-400">
          Monetiza tu audiencia, canal de Telegram, comunidad de Discord, web o redes sociales con el producto de IA de mayor retención del mercado.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => alert('¡Portal de afiliados de Nectar! Registro abierto en partners.nectar.ai')}
            className="flex h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#ff4747] to-[#e03e3e] px-8 text-sm font-bold text-white shadow-xl shadow-[#ff4747]/25 hover:brightness-110 active:scale-95 transition-all"
          >
            <Sparkles className="h-4 w-4" />
            <span>Registrarse como Afiliado</span>
          </button>
        </div>
      </div>

      {/* CALCULATOR */}
      <div className="mx-auto max-w-3xl rounded-3xl border border-[#27272a] bg-[#121215] p-6 sm:p-10 shadow-2xl mb-16">
        <div className="text-center mb-8">
          <h2 className="font-extended text-2xl font-bold text-white mb-1">
            Calculadora de Ganancias de Afiliado
          </h2>
          <p className="text-xs text-zinc-400">
            Ajusta la cantidad estimada de usuarios que refieres al mes para ver tus ingresos pasivos.
          </p>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-3 text-sm font-semibold">
            <span className="text-zinc-300">Usuarios Referidos Activos:</span>
            <span className="font-extended text-xl font-extrabold text-[#ff4747]">{referrals} usuarios</span>
          </div>
          <input
            type="range"
            min="10"
            max="2500"
            step="10"
            value={referrals}
            onChange={(e) => setReferrals(Number(e.target.value))}
            className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-[#27272a] accent-[#ff4747]"
          />
          <div className="flex justify-between text-[10px] text-zinc-500 mt-1">
            <span>10</span>
            <span>500</span>
            <span>1,000</span>
            <span>2,500+</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-2xl bg-[#18181b] p-6 text-center border border-[#27272a]">
          <div>
            <p className="text-xs text-zinc-400 mb-1">Ingresos Mensuales Estimados</p>
            <p className="font-extended text-3xl sm:text-4xl font-extrabold text-emerald-400">
              ${monthlyEarnings.toLocaleString()} <span className="text-xs text-zinc-500 font-normal">/ mes</span>
            </p>
          </div>
          <div>
            <p className="text-xs text-zinc-400 mb-1">Ingresos Anuales Estimados</p>
            <p className="font-extended text-3xl sm:text-4xl font-extrabold text-white">
              ${yearlyEarnings.toLocaleString()} <span className="text-xs text-zinc-500 font-normal">/ año</span>
            </p>
          </div>
        </div>
      </div>

      {/* Benefits Grid */}
      <div className="mb-16">
        <div className="text-center mb-10">
          <h2 className="font-extended text-3xl font-bold text-white mb-2">
            ¿Por Qué Asociarse con Nectar AI?
          </h2>
          <p className="text-xs text-zinc-400 max-w-xl mx-auto">
            Ofrecemos el programa más rentable para promotores, creadores y agencias de medios en el espacio de la IA.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div 
                key={idx}
                className="rounded-2xl border border-[#27272a] bg-[#121215] p-6 hover:border-[#ff4747]/50 transition-all shadow-md"
              >
                <div className="h-10 w-10 rounded-xl bg-[#ff4747]/15 flex items-center justify-center text-[#ff4747] mb-4">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-extended text-sm font-bold text-white mb-2">{b.title}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">{b.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

