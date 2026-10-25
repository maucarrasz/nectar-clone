const fs = require('fs');
const path = require('path');

console.log('--- OPEN LOVABLE: Building Perfect Nectar Clone V2 (Pixel-Perfect Parity) ---');

// 1. Read unlocked HTML (contains all 245 companion cards & real layout)
let html = fs.readFileSync('/tmp/firecrawl_nectar_unlocked.html', 'utf8');

// 2. Read assets mapping
const mapping = JSON.parse(fs.readFileSync('/home/mauriciocm/code/open-lovable/clones/nectar/public/firecrawl_assets_mapping.json', 'utf8'));

// Strip SSR lock traps
html = html.replace(/\s*data-scroll-locked="[^"]*"/g, '');
html = html.replace(/\s*data-scroll-locked/g, '');
html = html.replace(/\s*data-offscreen="[^"]*"/g, '');
html = html.replace(/\s*data-offscreen/g, '');
html = html.replace(/animation-play-state:\s*paused;?/gi, '');
html = html.replace(/pointer-events:\s*none;?/gi, '');
html = html.replace(/data-aria-hidden="true"/g, '');
html = html.replace(/aria-hidden="true"/g, '');

// Clean body tag
html = html.replace(/<body[^>]*>/, '<body class="am3G8q_variable _4a5q0W_variable bg-[#09090b] text-[#f4f4f5] antialiased selection:bg-[#ff4747]/30 selection:text-white pb-14 md:pb-0" style="overflow-x: hidden;">');

// Replace all media asset URLs with local assets
const keys = Object.keys(mapping).sort((a, b) => b.length - a.length);
let replacedCount = 0;
for (const key of keys) {
  if (html.includes(key)) {
    html = html.split(key).join(mapping[key]);
    replacedCount++;
  }
}
console.log(`Replaced ${replacedCount} media URLs with local self-hosted assets!`);

// Replace internal URLs with relative paths
html = html.replace(/https:\/\/nectar\.ai\/es\/discover\?type=fantasies&amp;groupchatsOnly=true/g, '/discover?type=fantasies&groupchatsOnly=true');
html = html.replace(/https:\/\/nectar\.ai\/es\/discover\?type=fantasies/g, '/discover?type=fantasies');
html = html.replace(/https:\/\/nectar\.ai\/es\/pricing/g, '/pricing');
html = html.replace(/https:\/\/nectar\.ai\/pricing/g, '/pricing');
html = html.replace(/https:\/\/nectar\.ai\/affiliate/g, '/affiliate');
html = html.replace(/https:\/\/nectar\.ai\/community/g, '/community');
html = html.replace(/https:\/\/nectar\.ai\/tag/g, '/tag');
html = html.replace(/https:\/\/docs\.nectar\.ai\/?/g, '/docs');
html = html.replace(/https:\/\/nectar\.ai\/es\/girls\/create/g, '/girls/create');
html = html.replace(/https:\/\/nectar\.ai\/girls\/create/g, '/girls/create');
html = html.replace(/https:\/\/nectar\.ai\/es\/fantasy\/create/g, '/create');
html = html.replace(/https:\/\/nectar\.ai\/create/g, '/create');
html = html.replace(/https:\/\/nectar\.ai\/es\/messages\?[^"]+/g, '/messages');
html = html.replace(/https:\/\/nectar\.ai\/messages/g, '/messages');
html = html.replace(/https:\/\/nectar\.ai\/user\/saves\/companions/g, '/user/saves/companions');
html = html.replace(/https:\/\/nectar\.ai\/u\/[a-zA-Z0-9_]+/g, '/u/username');
html = html.replace(/https:\/\/nectar\.ai\/dashboard/g, '/dashboard');
html = html.replace(/https:\/\/nectar\.ai\/es\/tos/g, '/tos');
html = html.replace(/https:\/\/nectar\.ai\/es/g, '/');
html = html.replace(/https:\/\/nectar\.ai\/assets\//g, '/assets/');

// Inject semantic ID to hero carousel track
html = html.replace(
  '<div class="flex ml-0" style="transform: translate3d(-1552px, 0px, 0px);"',
  '<div id="hero-carousel-track" class="flex ml-0 transition-transform duration-500 ease-in-out" style="transform: translate3d(0px, 0px, 0px);"'
);

// Add dot index attributes to hero carousel dot buttons
let dotIndex = 0;
html = html.replace(/<button type="button" class="group flex h-6 items-center px-1" aria-label="Ir a la diapositiva \d"/g, (match) => {
  const replacement = `${match} data-hero-dot="${dotIndex}"`;
  dotIndex++;
  return replacement;
});

// Fix 2-column layout responsiveness:
// 1. Grid should be 1 column on mobile/tablet, 2 columns on desktop (lg:)
html = html.replace(
  '<div class="grid gap-4 grid-cols-[1fr_256px]" data-include-tags="Female,Companions">',
  '<div class="grid gap-4 grid-cols-1 lg:grid-cols-[1fr_256px]" data-include-tags="Female,Companions">'
);

// 2. Hide right filter sidebar on mobile/tablet (< 1024px), show only on desktop (lg:block)
html = html.replace(
  '</div></div><div><div class="sticky top-navbar  h-fit pt-2.5 md:top-0"><div class="flex h-fit flex-col rounded-2xl border">',
  '</div></div><div class="hidden lg:block w-[256px] shrink-0"><div class="sticky top-navbar h-fit pt-2.5 md:top-0"><div class="flex h-fit flex-col rounded-2xl border">'
);

// 3. Inject mobile filter trigger button next to the search input on mobile/tablet
const mobileFilterBtn = `
  <button id="mobile-filter-trigger" class="relative flex size-10 shrink-0 items-center justify-center rounded-full border border-background-200 bg-background-500 text-foreground-400 hover:text-white lg:hidden" aria-label="Abrir filtros">
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
    <span class="absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">2</span>
  </button>
`;
html = html.replace(
  '<input placeholder="Buscar" class="h-full w-0 flex-grow bg-transparent pl-1.5 pr-2.5 outline-none" type="text" value=""></div></div></div></div>',
  `<input placeholder="Buscar" class="h-full w-0 flex-grow bg-transparent pl-1.5 pr-2.5 outline-none" type="text" value=""></div></div>${mobileFilterBtn}</div></div>`
);

// Construct the EXACT pixel-perfect Left Sidebar observed in reference_nectar_unlocked.png
const exactLeftSidebarHtml = `
<aside id="desktop-sidebar" class="fixed inset-y-0 left-0 z-40 hidden flex-col justify-between border-r border-[#1f1f23] bg-[#09090b] py-4 md:flex md:w-[68px] items-center select-none">
  <!-- Top items -->
  <div class="flex flex-col items-center gap-6">
    <!-- Heart Brand Logo -->
    <a href="/" class="group flex size-10 items-center justify-center rounded-full bg-[#18181b] transition-transform hover:scale-105" title="Nectar AI">
      <img src="/assets/heart_logo_webp_xvZ28ud2VicA.webp" alt="Nectar" class="size-7 object-contain">
    </a>

    <!-- Nav Icons -->
    <nav class="flex flex-col items-center gap-4">
      <!-- Home (Active) -->
      <a href="/" class="flex size-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors" title="Explorar">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
      </a>

      <!-- Create (+) -->
      <a href="/girls/create" class="flex size-10 items-center justify-center rounded-full text-foreground-600 transition-colors hover:bg-white/5 hover:text-white" title="Crear">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"></path></svg>
      </a>

      <!-- Messages / Cards -->
      <a href="/messages" class="flex size-10 items-center justify-center rounded-full text-foreground-600 transition-colors hover:bg-white/5 hover:text-white" title="Mensajes">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect><circle cx="9" cy="9" r="2"></circle><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path></svg>
      </a>

      <!-- Community / Users -->
      <a href="/community" class="flex size-10 items-center justify-center rounded-full text-foreground-600 transition-colors hover:bg-white/5 hover:text-white" title="Comunidad">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
      </a>
    </nav>
  </div>

  <!-- Bottom items -->
  <div class="flex flex-col items-center gap-4">
    <!-- Language -->
    <button class="flex size-9 items-center justify-center rounded-full text-foreground-600 transition-colors hover:bg-white/5 hover:text-white" title="Idioma">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 8 6 6"></path><path d="m4 14 6-6 2-3"></path><path d="M2 5h12"></path><path d="M7 2h1"></path><path d="m22 22-5-10-5 10"></path><path d="M14 18h6"></path></svg>
    </button>

    <!-- Gender (Female symbol) -->
    <button class="flex size-9 items-center justify-center rounded-full text-foreground-600 transition-colors hover:bg-white/5 hover:text-white" title="Filtro de género">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z"></path><path d="M12 15v7"></path><path d="M9 19h6"></path></svg>
    </button>

    <!-- Bottom Red CTA Arrow Button -->
    <a href="/pricing" class="flex size-10 items-center justify-center rounded-full bg-[#ff4747] text-white shadow-lg shadow-red-500/25 transition-transform hover:scale-105 active:scale-95" title="Entrar / Únete">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
    </a>
  </div>
</aside>
`;

// Construct Mobile Drawer Navigation
const mobileDrawerHtml = `
<div id="mobile-nav-drawer" class="fixed inset-0 z-50 transform -translate-x-full transition-transform duration-300 md:hidden bg-background/95 backdrop-blur-xl">
  <div class="flex h-full flex-col justify-between p-6">
    <div class="flex items-center justify-between border-b border-border pb-4">
      <div class="flex items-center gap-3">
        <img src="/assets/heart_logo_webp_xvZ28ud2VicA.webp" alt="Nectar AI" class="size-8 object-contain">
        <span class="font-extended text-xl font-bold text-white">Nectar AI</span>
      </div>
      <button id="mobile-drawer-close" aria-label="Cerrar menú" class="rounded-full p-2 text-foreground-400 hover:bg-white/10 hover:text-white">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"></path></svg>
      </button>
    </div>
    <nav class="flex flex-col gap-2 py-6">
      <a href="/" class="flex items-center gap-4 rounded-xl bg-primary/10 px-4 py-3 text-primary font-medium text-lg">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
        Explorar
      </a>
      <a href="/messages" class="flex items-center gap-4 rounded-xl px-4 py-3 text-foreground hover:bg-white/5 text-lg">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="18" x="3" y="3" rx="2"></rect></svg>
        Mensajes
      </a>
      <a href="/girls/create" class="flex items-center gap-4 rounded-xl px-4 py-3 text-foreground hover:bg-white/5 text-lg">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"></path></svg>
        Crear Compañera
      </a>
      <a href="/community" class="flex items-center gap-4 rounded-xl px-4 py-3 text-foreground hover:bg-white/5 text-lg">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path></svg>
        Comunidad
      </a>
      <a href="/pricing" class="flex items-center gap-4 rounded-xl px-4 py-3 text-foreground hover:bg-white/5 text-lg">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 3h12l4 6-10 12L2 9Z"></path></svg>
        Precios
      </a>
      <a href="/affiliate" class="flex items-center gap-4 rounded-xl px-4 py-3 text-foreground hover:bg-white/5 text-lg">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle></svg>
        Afiliados
      </a>
      <a href="/docs" class="flex items-center gap-4 rounded-xl px-4 py-3 text-foreground hover:bg-white/5 text-lg">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"></path></svg>
        Documentación
      </a>
    </nav>
    <div class="flex flex-col gap-3 border-t border-border pt-4">
      <a href="/pricing" class="inline-flex w-full items-center justify-center rounded-full bg-primary px-5 py-3 text-base font-semibold text-white shadow-lg transition-transform active:scale-95">
        Únete Gratis
      </a>
    </div>
  </div>
</div>
`;

// Fixed Mobile Bottom Navigation Bar (matches ref_mobile_top.png)
const mobileBottomNavHtml = `
<nav id="mobile-bottom-nav" class="fixed bottom-0 inset-x-0 z-40 h-14 bg-[#09090b]/95 backdrop-blur-lg border-t border-[#1f1f23] flex justify-around items-center md:hidden px-2">
  <a href="/" class="flex flex-col items-center justify-center gap-1 text-primary">
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
    <span class="text-[10px] font-medium leading-none">Inicio</span>
  </a>
  <a href="/messages" class="flex flex-col items-center justify-center gap-1 text-foreground-600 hover:text-white">
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="18" x="3" y="3" rx="2"></rect><circle cx="9" cy="9" r="2"></circle><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path></svg>
    <span class="text-[10px] font-medium leading-none">Chat</span>
  </a>
  <a href="/girls/create" class="flex flex-col items-center justify-center gap-1 text-foreground-600 hover:text-white">
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"></path></svg>
    <span class="text-[10px] font-medium leading-none">Crear</span>
  </a>
  <a href="/create" class="flex flex-col items-center justify-center gap-1 text-foreground-600 hover:text-white">
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3z"></path></svg>
    <span class="text-[10px] font-medium leading-none">Generar</span>
  </a>
  <a href="/community" class="flex flex-col items-center justify-center gap-1 text-foreground-600 hover:text-white">
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
    <span class="text-[10px] font-medium leading-none">Comunidad</span>
  </a>
</nav>
`;

// Inject the exact sidebar, mobile drawer, and bottom navigation
html = html.replace('<div class="md:ml-sidebar-space-collapsed">', `${exactLeftSidebarHtml}${mobileDrawerHtml}${mobileBottomNavHtml}<div class="md:ml-sidebar-space-collapsed">`);

// Replace FAQ buttons with smooth accordion
const faqs = [
  {
    q: '¿Qué es Nectar?',
    a: 'Nectar es la plataforma líder para chatear y crear compañeras y compañeros de inteligencia artificial sin restricciones. Ofrece capacidades multimodales de última generación que incluyen texto, voz de alta fidelidad, generación de imágenes en tiempo real y videollamadas interactivas.'
  },
  {
    q: '¿Cómo empiezo?',
    a: 'Simplemente explora la colección de personajes disponibles en la página de inicio o crea una cuenta gratuita. Puedes comenzar a chatear de inmediato con cualquier compañera o crear tu propio personaje personalizado eligiendo su apariencia, personalidad y voz.'
  },
  {
    q: '¿Mis datos son privados en Nectar?',
    a: 'Sí, la privacidad y seguridad son fundamentales. Tus conversaciones, interacciones y creaciones son completamente confidenciales y encriptadas. No compartimos tus datos privados ni conversaciones con terceros.'
  },
  {
    q: '¿Puedo crear mi propio AI companion?',
    a: '¡Absolutamente! Nuestro creador de personajes te permite personalizar cada detalle: desde rasgos físicos, estilo visual (realista o anime), trasfondo y tono de conversación, hasta su propia voz y escenarios de rol personalizados.'
  },
  {
    q: '¿Es gratis usarlo?',
    a: 'Sí, Nectar ofrece un plan gratuito que te permite interactuar y chatear con companions todos los días. También disponemos de planes de suscripción premium para desbloquear mensajes ilimitados, generación avanzada de imágenes, videollamadas y funciones exclusivas.'
  }
];

faqs.forEach((item, idx) => {
  const target = `<button class="flex w-full items-center justify-between gap-4 py-3"><h3 class="w-full text-left transition-colors ease-out">${item.q}</h3><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down mt-0.5 h-4 w-4 text-white/70" aria-hidden="true"><path d="m6 9 6 6 6-6"></path></svg></button>`;
  const replacement = `
    <button class="faq-accordion-trigger flex w-full items-center justify-between gap-4 py-4 cursor-pointer text-left transition-colors hover:text-white" data-faq-id="${idx}">
      <h3 class="w-full text-base lg:text-lg font-medium transition-colors">${item.q}</h3>
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="faq-chevron shrink-0 transition-transform duration-300 text-white/70"><path d="m6 9 6 6 6-6"></path></svg>
    </button>
    <div id="faq-content-${idx}" class="faq-content overflow-hidden max-h-0 transition-all duration-300 ease-in-out text-sm lg:text-base text-foreground-700 leading-relaxed">
      <p class="pb-4 pt-1">${item.a}</p>
    </div>
  `;
  html = html.replace(target, replacement);
});

// Construct complete HTML document with <head> and scripts
const finalHtml = `<!DOCTYPE html>
<html lang="es" class="dark scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>Nectar AI | Crea y Chatea con Compañeras de IA Sin Filtros</title>
  <meta name="description" content="Plataforma líder para crear y chatear con compañeras de IA personalizadas. Generación de imágenes, videos y voz con máxima fidelidad y sin restricciones.">
  <link rel="icon" type="image/webp" href="/assets/heart_logo_webp_xvZ28ud2VicA.webp">
  
  <!-- Preload Favorit Fonts -->
  <link rel="preload" href="/fonts/ABCFavoritVariable_Trial.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="/fonts/ABCFavoritExtendedVariable_Trial.ttf" as="font" type="font/ttf" crossorigin>

  <!-- Canonical Nectar Original Stylesheet -->
  <link rel="stylesheet" href="/original-styles.css">

  <style>
    /* 100% Fidelity Enhancements */
    body {
      background-color: #09090b !important;
      color: #f4f4f5 !important;
      font-family: var(--font-favorit, system-ui, sans-serif);
      margin: 0;
      padding: 0;
    }
    
    /* Header blur overlay */
    .sticky.top-0 {
      background-color: rgba(9, 9, 11, 0.85) !important;
      backdrop-filter: blur(14px) saturate(135%) !important;
      -webkit-backdrop-filter: blur(14px) saturate(135%) !important;
    }

    /* Hero carousel transition */
    #hero-carousel-track {
      transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) !important;
      will-change: transform;
    }

    /* FAQ accordion active state */
    .faq-content.open {
      max-height: 250px !important;
    }
    .faq-chevron.rotated {
      transform: rotate(180deg) !important;
    }

    /* Age Gate Modal Animation */
    #age-gate-backdrop.hidden, #age-gate-dialog.hidden {
      display: none !important;
    }

    /* Smooth companion card hover */
    .hover\\:cursor-pointer {
      transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease !important;
    }
    .hover\\:cursor-pointer:hover {
      transform: translateY(-4px) !important;
    }
  </style>
</head>
${html.slice(html.indexOf('<body'))}
<script type="module" src="/src/main.js"></script>
</html>
`;

// Verify Tag Balance: Open Divs === Close Divs (Diff: 0)
const openDivs = (finalHtml.match(/<div[\s>]/g) || []).length;
const closeDivs = (finalHtml.match(/<\/div>/g) || []).length;
console.log(`DOM Tag Balance Check: Open Divs = ${openDivs}, Close Divs = ${closeDivs}, Diff = ${openDivs - closeDivs}`);
if (openDivs !== closeDivs) {
  console.warn(`WARNING: DOM tag imbalance! Diff = ${openDivs - closeDivs}`);
} else {
  console.log('✅ DOM Tag Balance Assertion Passed: Diff: 0');
}

// Write to clones/nectar/index.html
fs.writeFileSync('/home/mauriciocm/code/open-lovable/clones/nectar/index.html', finalHtml);
console.log(`✅ clones/nectar/index.html successfully written! Size: ${fs.statSync('/home/mauriciocm/code/open-lovable/clones/nectar/index.html').size} bytes`);
