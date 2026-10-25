import React, { useState } from 'react';
import { X, Mail, Lock, Sparkles, CheckCircle2 } from 'lucide-react';

export default function AuthModal({ isOpen, onClose }) {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md overflow-hidden rounded-2xl border border-[#27272a] bg-[#121215] p-6 shadow-2xl shadow-black/80 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1.5 text-zinc-400 hover:bg-[#18181b] hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <img src="/assets/heart_logo.webp" alt="Nectar Logo" className="mx-auto h-12 w-12 mb-3" />
          <h3 className="font-extended text-2xl font-bold tracking-tight">
            {isRegister ? 'Crear tu Cuenta en Nectar' : 'Bienvenido de Nuevo'}
          </h3>
          <p className="text-xs text-zinc-400 mt-1">
            {isRegister 
              ? 'Únete a más de 1.5 millones de creadores y usuarios' 
              : 'Accede a tus compañeras de IA, chats y creaciones'}
          </p>
        </div>

        {submitted ? (
          <div className="flex flex-col items-center justify-center py-8 text-center animate-in zoom-in-95">
            <CheckCircle2 className="h-12 w-12 text-emerald-400 mb-3" />
            <p className="text-sm font-semibold text-white">¡Sesión iniciada con éxito!</p>
            <p className="text-xs text-zinc-400 mt-1">Cargando tus datos y personajes...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1.5">Correo Electrónico</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                <input 
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@correo.com"
                  className="h-10 w-full rounded-xl border border-[#27272a] bg-[#18181b] pl-9 pr-3 text-sm text-white placeholder-zinc-500 focus:border-[#ff4747] focus:outline-none focus:ring-1 focus:ring-[#ff4747]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1.5">Contraseña</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                <input 
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="h-10 w-full rounded-xl border border-[#27272a] bg-[#18181b] pl-9 pr-3 text-sm text-white placeholder-zinc-500 focus:border-[#ff4747] focus:outline-none focus:ring-1 focus:ring-[#ff4747]"
                />
              </div>
            </div>

            <button 
              type="submit"
              className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#ff4747] to-[#e03e3e] text-sm font-bold text-white shadow-lg shadow-[#ff4747]/25 transition-all hover:brightness-110 active:scale-95"
            >
              <Sparkles className="h-4 w-4" />
              <span>{isRegister ? 'Registrarse Gratis' : 'Entrar a Nectar'}</span>
            </button>

            <div className="pt-2 text-center text-xs text-zinc-400">
              {isRegister ? (
                <>
                  ¿Ya tienes cuenta?{' '}
                  <button 
                    type="button" 
                    onClick={() => setIsRegister(false)}
                    className="font-semibold text-[#ff4747] hover:underline"
                  >
                    Inicia Sesión
                  </button>
                </>
              ) : (
                <>
                  ¿No tienes una cuenta aún?{' '}
                  <button 
                    type="button" 
                    onClick={() => setIsRegister(true)}
                    className="font-semibold text-[#ff4747] hover:underline"
                  >
                    Crea una gratis
                  </button>
                </>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

