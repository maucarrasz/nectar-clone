const fs = require('fs');
const path = require('path');

const messagesHtml = `<!DOCTYPE html>
<html lang="es" class="dark scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>Sabrina Palmer - Chats | Nectar AI</title>
  <meta name="description" content="Chatea en tiempo real con Sabrina Palmer y compañeras de IA en Nectar">
  <link rel="icon" type="image/webp" href="/assets/heart_logo_webp_xvZ28ud2VicA.webp">
  <link rel="preload" href="/fonts/ABCFavoritVariable_Trial.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="/fonts/ABCFavoritExtendedVariable_Trial.ttf" as="font" type="font/ttf" crossorigin>
  <link rel="stylesheet" href="/original-styles.css">
  <style>
    body { background-color: #09090b !important; color: #f4f4f5 !important; font-family: var(--font-favorit, system-ui, sans-serif); margin: 0; padding: 0; }
    
    /* Golden-brown chat bubble style matching Photo 5 */
    .golden-chat-bubble {
      background: rgba(72, 48, 28, 0.78) !important;
      border: 1px solid rgba(140, 95, 55, 0.35) !important;
      color: #fcf4e4 !important;
      backdrop-filter: blur(12px) !important;
      -webkit-backdrop-filter: blur(12px) !important;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.37);
    }

    .user-chat-bubble {
      background: rgba(30, 30, 35, 0.85) !important;
      border: 1px solid rgba(255, 255, 255, 0.08) !important;
      color: #ffffff !important;
      backdrop-filter: blur(8px) !important;
    }
  </style>
</head>
<body class="am3G8q_variable _4a5q0W_variable bg-[#09090b] text-[#f4f4f5] antialiased overflow-hidden select-none">

<!-- App Layout: Left Sidebar + Chats List + Main Chat Window -->
<div class="flex h-screen w-screen overflow-hidden">

  <!-- 1. Left Expandable Sidebar (68px -> 250px on hover) -->
  <aside id="desktop-sidebar" class="group/sidebar fixed inset-y-0 left-0 z-50 hidden flex-col justify-between border-r border-[#1f1f23] bg-[#09090b] transition-all duration-300 ease-in-out md:flex w-[68px] hover:w-[250px] hover:shadow-2xl hover:shadow-black overflow-hidden select-none">
    <div class="flex flex-col py-4 px-3 w-[250px]">
      <a href="/" class="flex items-center gap-3 h-10 px-1 rounded-xl transition-colors hover:bg-white/5" title="Nectar AI">
        <img src="/assets/heart_logo_webp_xvZ28ud2VicA.webp" alt="Nectar" class="size-8 shrink-0 object-contain">
        <span class="font-extended text-xl font-bold tracking-tight text-white opacity-0 transition-opacity duration-200 group-hover/sidebar:opacity-100 whitespace-nowrap">Nectar</span>
      </a>

      <nav class="mt-6 flex flex-col gap-1.5">
        <a href="/" class="flex h-11 items-center gap-3.5 rounded-xl px-2.5 text-foreground-400 hover:bg-white/5 hover:text-white transition-colors" title="Inicio">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="shrink-0"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
          <span class="opacity-0 transition-opacity duration-200 group-hover/sidebar:opacity-100 whitespace-nowrap text-sm font-medium">Inicio</span>
        </a>
        <a href="/messages" class="flex h-11 items-center gap-3.5 rounded-xl px-2.5 bg-white/10 text-white transition-colors" title="Chats">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="shrink-0"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path></svg>
          <span class="opacity-0 transition-opacity duration-200 group-hover/sidebar:opacity-100 whitespace-nowrap text-sm font-medium">Chats</span>
        </a>
        <a href="/girls/create" class="flex h-11 items-center gap-3.5 rounded-xl px-2.5 text-foreground-400 hover:bg-white/5 hover:text-white transition-colors" title="Crear">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="shrink-0"><path d="M12 5v14M5 12h14"></path></svg>
          <span class="opacity-0 transition-opacity duration-200 group-hover/sidebar:opacity-100 whitespace-nowrap text-sm font-medium">Crear</span>
        </a>
        <a href="/create" class="flex h-11 items-center gap-3.5 rounded-xl px-2.5 text-foreground-400 hover:bg-white/5 hover:text-white transition-colors" title="Generar">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="shrink-0"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3z"></path></svg>
          <span class="opacity-0 transition-opacity duration-200 group-hover/sidebar:opacity-100 whitespace-nowrap text-sm font-medium">Generar</span>
        </a>
        <a href="/community" class="flex h-11 items-center gap-3.5 rounded-xl px-2.5 text-foreground-400 hover:bg-white/5 hover:text-white transition-colors" title="Comunidad">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="shrink-0"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path></svg>
          <span class="opacity-0 transition-opacity duration-200 group-hover/sidebar:opacity-100 whitespace-nowrap text-sm font-medium flex items-center gap-1.5">
            Comunidad <span class="rounded bg-[#ef4444]/20 px-1.5 py-0.5 text-[10px] font-semibold text-[#ef4444]">¡Nuevo!</span>
          </span>
        </a>
      </nav>

      <div class="mt-4">
        <a href="/pricing" class="flex h-11 items-center gap-3 rounded-2xl bg-gradient-to-r from-[#ff334b] to-[#ff4747] px-3 font-semibold text-white shadow-lg shadow-red-500/25 transition-transform hover:scale-[1.02] active:scale-[0.98]">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="shrink-0"><path d="M6 3h12l4 6-10 12L2 9Z"></path></svg>
          <span class="opacity-0 transition-opacity duration-200 group-hover/sidebar:opacity-100 whitespace-nowrap text-sm">Mejorar</span>
        </a>
      </div>
    </div>

    <div class="flex flex-col py-3 px-3 w-[250px] border-t border-[#1f1f23] gap-3">
      <button class="flex h-10 items-center gap-3 rounded-xl px-2.5 text-foreground-400 hover:bg-white/5 hover:text-white transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="shrink-0"><path d="m5 8 6 6"></path><path d="m4 14 6-6 2-3"></path><path d="M2 5h12"></path><path d="M7 2h1"></path><path d="m22 22-5-10-5 10"></path><path d="M14 18h6"></path></svg>
        <span class="opacity-0 transition-opacity duration-200 group-hover/sidebar:opacity-100 whitespace-nowrap text-sm">Idioma</span>
      </button>

      <div class="flex items-center justify-between rounded-xl p-1 text-left hover:bg-white/5 transition-colors cursor-pointer">
        <div class="flex items-center gap-2.5 min-w-0">
          <div class="size-8 rounded-full bg-gradient-to-tr from-purple-600 to-pink-500 shrink-0 flex items-center justify-center text-xs font-bold text-white">N</div>
          <div class="opacity-0 transition-opacity duration-200 group-hover/sidebar:opacity-100 min-w-0">
            <p class="truncate text-xs font-medium text-white">insensibly-convenient-...</p>
            <p class="text-[10px] text-foreground-500">Plan Free</p>
          </div>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-foreground-500 opacity-0 group-hover/sidebar:opacity-100 shrink-0"><path d="m6 9 6 6 6-6"></path></svg>
      </div>
    </div>
  </aside>

  <!-- 2. Middle Column: Chats List (matching Photo 5) -->
  <div class="md:ml-[68px] w-full md:w-[310px] shrink-0 border-r border-[#1f1f23] bg-[#09090b] flex flex-col z-20">
    <!-- Chats Header -->
    <div class="h-14 px-4 border-b border-[#1f1f23] flex items-center justify-between">
      <h2 class="text-lg font-bold text-white font-extended tracking-wide">Chats</h2>
      <div class="flex items-center gap-3 text-foreground-400">
        <button class="hover:text-white transition-colors" title="Nuevo chat">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M8 12h8"/><path d="M12 8v8"/></svg>
        </button>
        <button class="hover:text-white transition-colors" title="Cerrar panel">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
      </div>
    </div>

    <!-- Conversations List -->
    <div id="chats-conversation-list" class="flex-1 overflow-y-auto divide-y divide-[#1f1f23]/40">
      <!-- Item: Sabrina Palmer (Active by default in Photo 5) -->
      <div class="chat-conv-item relative flex items-center gap-3.5 p-3.5 bg-white/5 cursor-pointer hover:bg-white/10 transition-colors border-l-2 border-[#ef4444]" data-id="sabrina-palmer" data-name="Sabrina Palmer" data-img="/assets/companions/comp_930a703b-ea72-4254-8269-c8fcb25d9200.webp">
        <img src="/assets/companions/comp_930a703b-ea72-4254-8269-c8fcb25d9200.webp" alt="Sabrina Palmer" class="size-11 rounded-full object-cover shrink-0 ring-1 ring-white/10">
        <div class="flex-1 min-w-0">
          <h4 class="font-medium text-white text-sm truncate">Sabrina Palmer</h4>
          <p class="text-xs text-foreground-400 truncate mt-0.5">My breath hitched slightly at ...</p>
        </div>
      </div>

      <!-- Item: Nicole Wagner -->
      <div class="chat-conv-item relative flex items-center gap-3.5 p-3.5 cursor-pointer hover:bg-white/5 transition-colors border-l-2 border-transparent" data-id="nicole-wagner" data-name="Nicole Wagner" data-img="/assets/companions/comp_29f0023c-8966-4717-9c21-4634c3785f00.webp">
        <img src="/assets/companions/comp_29f0023c-8966-4717-9c21-4634c3785f00.webp" alt="Nicole Wagner" class="size-11 rounded-full object-cover shrink-0 ring-1 ring-white/10">
        <div class="flex-1 min-w-0">
          <h4 class="font-medium text-white text-sm truncate">Nicole Wagner</h4>
          <p class="text-xs text-foreground-400 truncate mt-0.5">Hola cariño, ¿en qué estás pensando hoy?</p>
        </div>
      </div>

      <!-- Item: Yuki San -->
      <div class="chat-conv-item relative flex items-center gap-3.5 p-3.5 cursor-pointer hover:bg-white/5 transition-colors border-l-2 border-transparent" data-id="yuki-san" data-name="Yuki San" data-img="/assets/companions/comp_cd451e4d-cf60-4c51-ae9c-289ac3c2e800.webp">
        <img src="/assets/companions/comp_cd451e4d-cf60-4c51-ae9c-289ac3c2e800.webp" alt="Yuki San" class="size-11 rounded-full object-cover shrink-0 ring-1 ring-white/10">
        <div class="flex-1 min-w-0">
          <h4 class="font-medium text-white text-sm truncate">Yuki San</h4>
          <p class="text-xs text-foreground-400 truncate mt-0.5">Te envié una foto nueva, avísame si te gusta 💕</p>
        </div>
      </div>

      <!-- Item: Adriana Phillips -->
      <div class="chat-conv-item relative flex items-center gap-3.5 p-3.5 cursor-pointer hover:bg-white/5 transition-colors border-l-2 border-transparent" data-id="adriana-phillips" data-name="Adriana Phillips" data-img="/assets/companions/comp_da4c8acd-39df-48d0-8de0-21558864e700.webp">
        <img src="/assets/companions/comp_da4c8acd-39df-48d0-8de0-21558864e700.webp" alt="Adriana Phillips" class="size-11 rounded-full object-cover shrink-0 ring-1 ring-white/10">
        <div class="flex-1 min-w-0">
          <h4 class="font-medium text-white text-sm truncate">Adriana Phillips</h4>
          <p class="text-xs text-foreground-400 truncate mt-0.5">El atardecer en el castillo es mágico...</p>
        </div>
      </div>

      <!-- Item: Katherine Richardson -->
      <div class="chat-conv-item relative flex items-center gap-3.5 p-3.5 cursor-pointer hover:bg-white/5 transition-colors border-l-2 border-transparent" data-id="katherine-richardson" data-name="Katherine Richardson" data-img="/assets/companions/comp_f529b6ca-7a25-49ff-313e-3b39a8ba6400.webp">
        <img src="/assets/companions/comp_f529b6ca-7a25-49ff-313e-3b39a8ba6400.webp" alt="Katherine Richardson" class="size-11 rounded-full object-cover shrink-0 ring-1 ring-white/10">
        <div class="flex-1 min-w-0">
          <h4 class="font-medium text-white text-sm truncate">Katherine Richardson</h4>
          <p class="text-xs text-foreground-400 truncate mt-0.5">Everyone on campus wants something from me...</p>
        </div>
      </div>
    </div>
  </div>

  <!-- 3. Main Chat Area: Dynamic Full-Screen Character Background & Golden Bubbles (Photo 5) -->
  <div class="relative flex-1 hidden md:flex flex-col bg-[#09090b] overflow-hidden">
    
    <!-- Character Background Image with Dark Dimming Vignette -->
    <div class="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      <img id="chat-backdrop-img" src="/assets/companions/comp_930a703b-ea72-4254-8269-c8fcb25d9200.webp" alt="Background" class="w-full h-full object-cover object-center filter blur-[1px] brightness-[0.38] transition-all duration-500 ease-in-out scale-105">
      <div class="absolute inset-0 bg-gradient-to-t from-[#09090b] via-black/40 to-[#09090b]/80"></div>
    </div>

    <!-- Top Chat Navbar (Photo 5) -->
    <div class="relative z-10 h-14 border-b border-[#1f1f23]/80 bg-[#09090b]/70 backdrop-blur-md px-6 flex items-center justify-between">
      <!-- Companion Avatar + Name -->
      <div class="flex items-center gap-3">
        <img id="chat-header-avatar" src="/assets/companions/comp_930a703b-ea72-4254-8269-c8fcb25d9200.webp" alt="Sabrina Palmer" class="size-9 rounded-full object-cover ring-1 ring-white/20">
        <h3 id="chat-header-name" class="font-semibold text-white text-base">Sabrina Palmer</h3>
      </div>

      <!-- Right controls: Credits, Roleplay mode, Video, Call, Layout -->
      <div class="flex items-center gap-3 text-sm">
        <!-- + 0 Credits -->
        <a href="/pricing" class="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#18181b]/80 border border-[#27272a] text-white hover:border-[#3f3f46] transition-colors">
          <span class="text-xs font-bold text-foreground-400">+</span>
          <span class="text-xs font-bold text-white">0</span>
        </a>

        <!-- Roleplay básico -->
        <button class="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#18181b]/80 border border-[#27272a] text-xs font-medium text-white hover:border-[#3f3f46] transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m16 3 4 4-4 4"/><path d="M20 7H4"/><path d="m8 21-4-4 4-4"/><path d="M4 17h16"/></svg>
          Roleplay básico
        </button>

        <!-- Video Call Icon -->
        <button class="p-2 rounded-full hover:bg-white/10 text-foreground-400 hover:text-white transition-colors" title="Videollamada">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m22 8-6 4 6 4V8Z"/><rect width="14" height="12" x="2" y="6" rx="2"/></svg>
        </button>

        <!-- Voice Call Icon -->
        <button class="p-2 rounded-full hover:bg-white/10 text-foreground-400 hover:text-white transition-colors" title="Llamada de voz">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
        </button>

        <!-- Layout icon -->
        <button class="p-2 rounded-full hover:bg-white/10 text-foreground-400 hover:text-white transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18"/></svg>
        </button>
      </div>
    </div>

    <!-- Red Alert Banner: + 0 créditos restantes (Photo 5) -->
    <div class="relative z-10 mx-6 mt-3 px-4 py-2 rounded-xl bg-[#3b1216]/90 border border-[#7f1d1d]/60 flex items-center justify-between text-xs backdrop-blur-sm">
      <div class="flex items-center gap-2 text-[#fca5a5]">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>
        <span class="font-medium">+ 0 créditos restantes</span>
      </div>
      <a href="/pricing" class="inline-flex items-center gap-1 rounded-full border border-[#f87171]/40 bg-[#ef4444]/20 px-3 py-1 font-semibold text-[#fecaca] hover:bg-[#ef4444]/30 transition-colors">
        Obtener más &gt;
      </a>
    </div>

    <!-- Chat Messages Stream (Scrollable) -->
    <div id="chat-messages-container" class="relative z-10 flex-1 overflow-y-auto px-6 py-6 space-y-6">
      
      <!-- Companion Message 1: Golden Narrative Bubble (Photo 5) -->
      <div class="flex items-start gap-3 max-w-[85%] lg:max-w-[70%]">
        <img id="chat-bubble-avatar-1" src="/assets/companions/comp_930a703b-ea72-4254-8269-c8fcb25d9200.webp" class="size-7 rounded-full object-cover shrink-0 mt-1 ring-1 ring-white/10">
        <div class="golden-chat-bubble rounded-3xl p-5 text-sm lg:text-[15px] leading-relaxed text-[#fbf0dc]">
          <p class="font-normal mb-3">Hi.</p>
          <p class="italic text-[#f4e2c6] leading-relaxed">
            My voice came out small, a fragile sound. I looked up at you, my smile trembling at the edges, my bright blue eyes wide with a mixture of nostalgia and a terrifying, new kind of interest. The simple word hung in the space between us, heavy with everything unsaid.
          </p>
        </div>
      </div>

      <!-- User Message (Right Side) (Photo 5) -->
      <div class="flex justify-end items-center gap-2.5">
        <button class="text-foreground-500 hover:text-white p-1" title="Editar mensaje">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>
        </button>
        <div class="user-chat-bubble rounded-2xl px-5 py-3 text-sm lg:text-[15px] font-medium text-white shadow-lg">
          Hi
        </div>
      </div>

      <!-- Companion Message 2: Golden Narrative Bubble with Action Icons (Photo 5) -->
      <div class="flex flex-col gap-2 max-w-[85%] lg:max-w-[70%]">
        <div class="flex items-start gap-3">
          <img id="chat-bubble-avatar-2" src="/assets/companions/comp_930a703b-ea72-4254-8269-c8fcb25d9200.webp" class="size-7 rounded-full object-cover shrink-0 mt-1 ring-1 ring-white/10">
          <div class="golden-chat-bubble rounded-3xl p-5 text-sm lg:text-[15px] leading-relaxed text-[#fbf0dc]">
            <p class="italic text-[#f4e2c6] leading-relaxed">
              My breath hitched slightly at your response, the single word somehow both casual and momentous. Up close, I could see the way your jawline had sharpened since you sat in my classroom all those years ago, the slope of your shoulders more masculine now. A flicker of something hot and electric seemed to arc through the air between us.
            </p>
          </div>
        </div>
        
        <!-- Action Buttons row (Photo 5) -->
        <div class="flex items-center gap-4 pl-10 text-foreground-400 text-xs">
          <button class="hover:text-white transition-colors" title="Regenerar respuesta">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 21h5v-5"/></svg>
          </button>
          <div class="flex items-center gap-1">
            <button class="hover:text-amber-400 transition-colors">★</button>
            <button class="hover:text-amber-400 transition-colors">★</button>
            <button class="hover:text-amber-400 transition-colors">★</button>
            <button class="hover:text-amber-400 transition-colors">★</button>
            <button class="hover:text-amber-400 transition-colors">★</button>
          </div>
          <button class="hover:text-white transition-colors" title="Copiar texto">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
          </button>
          <button class="hover:text-white transition-colors" title="Siguiente">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m13 17 5-5-5-5"/><path d="m6 17 5-5-5-5"/></svg>
          </button>
        </div>
      </div>

    </div>

    <!-- Bottom Input Bar (Photo 5) -->
    <div class="relative z-10 p-5 bg-[#09090b]/80 backdrop-blur-md border-t border-[#1f1f23]/60">
      <form id="chat-input-form" class="flex items-center gap-3 rounded-full border border-[#27272a] bg-[#141417]/90 px-4 py-2.5 shadow-2xl focus-within:border-[#3f3f46]">
        <!-- Idea bulb icon -->
        <button type="button" class="text-foreground-500 hover:text-amber-400 transition-colors p-1" title="Sugerir ideas">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>
        </button>

        <!-- Text input -->
        <input id="chat-input-field" type="text" placeholder="Escribe un mensaje" class="flex-1 bg-transparent text-sm text-white placeholder:text-foreground-500 outline-none">

        <!-- Attachment spark/plus icon -->
        <button type="button" class="text-foreground-500 hover:text-white transition-colors p-1" title="Adjuntar">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>
        </button>

        <!-- Settings gear icon -->
        <button type="button" class="text-foreground-500 hover:text-white transition-colors p-1" title="Ajustes de mensaje">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
        </button>

        <!-- Circular upward Send arrow button -->
        <button type="submit" class="size-8 rounded-full bg-white/20 hover:bg-white text-white hover:text-black transition-all flex items-center justify-center shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></svg>
        </button>
      </form>
    </div>
  </div>
</div>

<script>
  // Dynamic companion switcher & chat interactive logic
  document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const initialId = params.get('id');

    const backdropImg = document.getElementById('chat-backdrop-img');
    const headerAvatar = document.getElementById('chat-header-avatar');
    const headerName = document.getElementById('chat-header-name');
    const bubbleAvatar1 = document.getElementById('chat-bubble-avatar-1');
    const bubbleAvatar2 = document.getElementById('chat-bubble-avatar-2');
    const convItems = document.querySelectorAll('.chat-conv-item');
    const messagesContainer = document.getElementById('chat-messages-container');
    const inputForm = document.getElementById('chat-input-form');
    const inputField = document.getElementById('chat-input-field');

    function setActiveCompanion(item) {
      convItems.forEach(i => {
        i.classList.remove('bg-white/5', 'border-[#ef4444]');
        i.classList.add('border-transparent');
      });
      item.classList.add('bg-white/5', 'border-[#ef4444]');
      item.classList.remove('border-transparent');

      const name = item.getAttribute('data-name');
      const img = item.getAttribute('data-img');

      if (headerName) headerName.textContent = name;
      if (document.title) document.title = \`\${name} - Chats | Nectar AI\`;
      if (backdropImg) backdropImg.src = img;
      if (headerAvatar) headerAvatar.src = img;
      if (bubbleAvatar1) bubbleAvatar1.src = img;
      if (bubbleAvatar2) bubbleAvatar2.src = img;
    }

    convItems.forEach(item => {
      item.addEventListener('click', () => {
        setActiveCompanion(item);
      });
    });

    if (initialId) {
      const match = Array.from(convItems).find(i => i.getAttribute('data-id').includes(initialId));
      if (match) setActiveCompanion(match);
    }

    // Interactive message sending
    if (inputForm && inputField) {
      inputForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = inputField.value.trim();
        if (!text) return;
        inputField.value = '';

        // Append user bubble
        const userDiv = document.createElement('div');
        userDiv.className = 'flex justify-end items-center gap-2.5';
        userDiv.innerHTML = \`
          <button class="text-foreground-500 hover:text-white p-1" title="Editar mensaje">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>
          </button>
          <div class="user-chat-bubble rounded-2xl px-5 py-3 text-sm lg:text-[15px] font-medium text-white shadow-lg">
            \${text}
          </div>
        \`;
        messagesContainer.appendChild(userDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        // Simulate companion response
        setTimeout(() => {
          const compName = headerName ? headerName.textContent : 'Sabrina';
          const currentImg = headerAvatar ? headerAvatar.src : '';
          const compDiv = document.createElement('div');
          compDiv.className = 'flex flex-col gap-2 max-w-[85%] lg:max-w-[70%]';
          compDiv.innerHTML = \`
            <div class="flex items-start gap-3">
              <img src="\${currentImg}" class="size-7 rounded-full object-cover shrink-0 mt-1 ring-1 ring-white/10">
              <div class="golden-chat-bubble rounded-3xl p-5 text-sm lg:text-[15px] leading-relaxed text-[#fbf0dc]">
                <p class="italic text-[#f4e2c6] leading-relaxed">
                  I soften as I look into your eyes, feeling the warmth of your presence right here with me. "I was hoping you'd say that," I murmur gently. "Tell me everything that's on your mind."
                </p>
              </div>
            </div>
            <div class="flex items-center gap-4 pl-10 text-foreground-400 text-xs">
              <button class="hover:text-white">★ ★ ★ ★ ★</button>
            </div>
          \`;
          messagesContainer.appendChild(compDiv);
          messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }, 800);
      });
    }
  });
</script>
</body>
</html>
`;

fs.writeFileSync(path.join(__dirname, '../messages/index.html'), messagesHtml);
console.log('✅ messages/index.html successfully updated with Photo 5 Golden Style & Dynamic Companion Switcher!');
