import React, { useState } from 'react';
import { PRICING_PLANS } from '../mock/data';
import { 
  Check, 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  CreditCard, 
  HelpCircle,
  Flame
} from 'lucide-react';

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-8 py-10 pb-28">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 rounded-full bg-[#ff4747]/10 px-4 py-1.5 text-xs font-semibold text-[#ff4747] mb-3">
          <Zap className="h-4 w-4" />
          <span>Planes Transparentes y Flexibles</span>
        </div>
        <h1 className="font-extended text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-4">
          Elige el Plan Perfecto para tu Compañera
        </h1>
        <p className="text-sm sm:text-base text-zinc-400">
          Chatea sin límites, desbloquea generación de fotos HD ultra nítidas, mensajes de voz en tiempo real y memoria permanente.
        </p>

        {/* Billing Toggle */}
        <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-[#27272a] bg-[#121215] p-1.5 shadow-md">
          <button
            type="button"
            onClick={() => setIsYearly(false)}
            className={`rounded-full px-5 py-2 text-xs font-bold transition-all ${
              !isYearly ? 'bg-[#ff4747] text-white shadow' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Facturación Mensual
          </button>
          <button
            type="button"
            onClick={() => setIsYearly(true)}
            className={`flex items-center gap-1.5 rounded-full px-5 py-2 text-xs font-bold transition-all ${
              isYearly ? 'bg-[#ff4747] text-white shadow' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <span>Facturación Anual</span>
            <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-extrabold text-emerald-400">
              Ahorra 20%
            </span>
          </button>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-16">
        {PRICING_PLANS.map((plan) => {
          const price = isYearly ? plan.priceYearly : plan.priceMonthly;
          return (
            <div
              key={plan.id}
              className={`relative flex flex-col justify-between rounded-3xl border p-6 sm:p-8 transition-all ${
                plan.isPopular 
                  ? 'border-[#ff4747] bg-gradient-to-b from-[#18121a] to-[#121215] shadow-2xl shadow-[#ff4747]/20 md:-translate-y-2' 
                  : 'border-[#27272a] bg-[#121215] hover:border-zinc-600'
              }`}
            >
              {plan.isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-[#ff4747] to-[#e03e3e] px-4 py-1 text-[11px] font-extrabold text-white shadow-md shadow-[#ff4747]/40 uppercase tracking-wider">
                  Recomendado
                </div>
              )}

              <div>
                {/* Plan Header */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-extended text-2xl font-bold text-white">{plan.name}</h3>
                  <span className="rounded-full bg-zinc-800/80 px-3 py-1 text-[11px] font-semibold text-zinc-300">
                    {plan.badge}
                  </span>
                </div>

                <p className="text-xs text-zinc-400 mb-6 leading-relaxed min-h-[36px]">
                  {plan.description}
                </p>

                {/* Price Display */}
                <div className="flex items-baseline gap-1.5 mb-6 pb-6 border-b border-[#27272a]">
                  <span className="text-4xl sm:text-5xl font-extrabold text-white">${price}</span>
                  <span className="text-xs text-zinc-400 font-medium">/ mes {isYearly && '(facturado anualmente)'}</span>
                </div>

                {/* Credits Pill */}
                <div className="mb-6 flex items-center gap-2 rounded-xl bg-[#ff4747]/10 p-2.5 border border-[#ff4747]/20">
                  <Sparkles className="h-4 w-4 text-[#ff4747] flex-shrink-0" />
                  <span className="text-xs font-bold text-[#ff4747]">{plan.credits}</span>
                </div>

                {/* Features List */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                      <div className="h-4 w-4 rounded-full bg-emerald-500/15 flex items-center justify-center text-emerald-400 flex-shrink-0 mt-0.5">
                        <Check className="h-3 w-3 stroke-[3]" />
                      </div>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button */}
              <button
                type="button"
                onClick={() => alert(`Iniciando checkout seguro para el plan ${plan.name}...`)}
                className={`flex h-12 w-full items-center justify-center gap-2 rounded-xl text-xs font-bold transition-all ${
                  plan.isPopular 
                    ? 'bg-[#ff4747] text-white shadow-lg shadow-[#ff4747]/30 hover:brightness-110 active:scale-95' 
                    : 'border border-[#27272a] bg-[#18181b] text-white hover:bg-[#27272a] hover:border-zinc-500'
                }`}
              >
                <span>{plan.ctaText}</span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Payment Security & Discreet Billing */}
      <div className="rounded-2xl border border-[#27272a] bg-[#121215] p-6 text-center max-w-4xl mx-auto mb-16">
        <h4 className="font-extended text-base font-bold text-white mb-2 flex items-center justify-center gap-2">
          <ShieldCheck className="h-5 w-5 text-emerald-400" />
          <span>Facturación 100% Discreta y Segura</span>
        </h4>
        <p className="text-xs text-zinc-400 max-w-xl mx-auto mb-6">
          En tu extracto bancario nunca aparecerá la palabra Nectar ni contenido explícito. Procesamos pagos con cifrado de grado militar de 256 bits y admitimos pagos anónimos en criptomonedas.
        </p>

        {/* Payment Icons */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-zinc-400">
          <div className="flex items-center gap-1.5 rounded-lg border border-[#27272a] bg-[#18181b] px-3 py-1.5">
            <span>💳 Visa</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-lg border border-[#27272a] bg-[#18181b] px-3 py-1.5">
            <span>💳 Mastercard</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-lg border border-[#27272a] bg-[#18181b] px-3 py-1.5">
            <span>₿ Bitcoin (BTC)</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-lg border border-[#27272a] bg-[#18181b] px-3 py-1.5">
            <span>Ξ Ethereum (ETH)</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-lg border border-[#27272a] bg-[#18181b] px-3 py-1.5">
            <span>💵 USDT / USDC</span>
          </div>
        </div>
      </div>
    </div>
  );
}

