const fs = require('fs');
const path = require('path');

console.log('--- OPEN LOVABLE: Building Perfect Nectar Clone (100% Fidelity) ---');

// 1. Read firecrawl scraped HTML
let html = fs.readFileSync('/tmp/firecrawl_nectar_es.html', 'utf8');

// 2. Read assets mapping
const mapping = JSON.parse(fs.readFileSync('/home/mauriciocm/code/open-lovable/clones/nectar/public/firecrawl_assets_mapping.json', 'utf8'));

// Strip SSR lock traps
html = html.replace(/\s*data-scroll-locked="[^"]*"/g, '');
html = html.replace(/\s*data-scroll-locked/g, '');
html = html.replace(/\s*data-offscreen="[^"]*"/g, '');
html = html.replace(/\s*data-offscreen/g, '');
html = html.replace(/animation-play-state:\s*paused;?/gi, '');

// Clean pointer-events: none from body tag
html = html.replace(/<body[^>]*>/, '<body class="am3G8q_variable _4a5q0W_variable bg-[#09090b] text-[#f4f4f5] antialiased selection:bg-[#ff4747]/30 selection:text-white" style="overflow-x: hidden;">');

// Remove data-aria-hidden="true" and aria-hidden="true" from the main wrapper container
html = html.replace(/<div class="min-h-\[100dvh\]"[^>]*>/, '<div class="min-h-[100dvh]" id="app-root">');

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
html = html.replace(/https:\/\/nectar\.ai\/es\/messages\?[^"]+/g, '/messages');
html = html.replace(/https:\/\/nectar\.ai\/es\/girls\/create/g, '/girls/create');
html = html.replace(/https:\/\/nectar\.ai\/es\/fantasy\/create/g, '/create');
html = html.replace(/https:\/\/nectar\.ai\/es\/tos/g, '/tos');
html = html.replace(/https:\/\/nectar\.ai\/es/g, '/');
html = html.replace(/https:\/\/nectar\.ai\/assets\//g, '/assets/');

// Inject semantic ID to hero carousel track
html = html.replace(
  '<div class="flex ml-0" style="transform: translate3d(-1552px, 0px, 0px);"',
  '<div id="hero-carousel-track" class="flex ml-0 transition-transform duration-500 ease-in-out" style="transform: translate3d(0px, 0px, 0px);"'
);

// Inject IDs into Age Gate dialog and buttons
html = html.replace(
  '<div data-state="open" class="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in',
  '<div id="age-gate-backdrop" data-state="open" class="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm transition-opacity duration-300'
);
html = html.replace(
  '<div role="alertdialog" id="radix-_R_cimeivb_"',
  '<div role="alertdialog" id="age-gate-dialog"'
);
html = html.replace(
  '<button class="inline-flex items-center cursor-pointer justify-center whitespace-nowrap rounded-full ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full">Tengo más de 18</button>',
  '<button id="age-gate-confirm-btn" class="inline-flex items-center cursor-pointer justify-center whitespace-nowrap rounded-full ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full">Tengo más de 18</button>'
);
html = html.replace(
  '<button class="mt-3 w-full text-xs text-foreground-800">Salir del sitio</button>',
  '<button id="age-gate-exit-btn" class="mt-3 w-full text-xs text-foreground-800 hover:underline">Salir del sitio</button>'
);

// Add dot index attributes to hero carousel dot buttons
let dotIndex = 0;
html = html.replace(/<button type="button" class="group flex h-6 items-center px-1" aria-label="Ir a la diapositiva \d"/g, (match) => {
  const replacement = `${match} data-hero-dot="${dotIndex}"`;
  dotIndex++;
  return replacement;
});

// Construct the Desktop Sidebar Navigation (Canonical Nectar AI layout)
const desktopSidebarHtml = `
<aside id="desktop-sidebar" class="group/sidebar fixed inset-y-0 left-0 z-40 hidden flex-col justify-between border-r border-border bg-[#0e0e11] transition-all duration-300 md:flex md:w-[68px] md:hover:w-[250px] overflow-hidden select-none">
  <!-- Top: Logo & Main Navigation -->
  <div class="flex flex-col py-3">
    <!-- Brand Logo -->
    <a href="/" class="flex h-12 items-center gap-3 px-4 transition-colors hover:text-white">
      <img src="/assets/heart_logo_webp_xvZ28ud2VicA.webp" alt="Nectar AI" class="h-8 w-8 shrink-0 object-contain">
      <span class="font-extended text-xl font-bold tracking-tight text-white opacity-0 transition-opacity duration-300 group-hover/sidebar:opacity-100 whitespace-nowrap">Nectar</span>
    </a>

    <!-- Nav Links -->
    <nav class="mt-6 flex flex-col gap-1.5 px-2">
      <!-- Explorar (Active) -->
      <a href="/" class="flex h-11 items-center gap-3.5 rounded-xl bg-primary/15 px-3 text-primary font-medium transition-colors hover:bg-primary/20">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="shrink-0"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>
        <span class="opacity-0 transition-opacity duration-300 group-hover/sidebar:opacity-100 whitespace-nowrap text-sm">Explorar</span>
      </a>

      <!-- Mensajes -->
      <a href="/messages" class="flex h-11 items-center gap-3.5 rounded-xl px-3 text-foreground-600 transition-colors hover:bg-white/5 hover:text-white">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="shrink-0"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path></svg>
        <span class="opacity-0 transition-opacity duration-300 group-hover/sidebar:opacity-100 whitespace-nowrap text-sm">Mensajes</span>
      </a>

      <!-- Crear -->
      <a href="/girls/create" class="flex h-11 items-center gap-3.5 rounded-xl px-3 text-foreground-600 transition-colors hover:bg-white/5 hover:text-white">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="shrink-0"><path d="M12 5v14M5 12h14"></path></svg>
        <span class="opacity-0 transition-opacity duration-300 group-hover/sidebar:opacity-100 whitespace-nowrap text-sm">Crear</span>
      </a>

      <!-- Comunidad -->
      <a href="/community" class="flex h-11 items-center gap-3.5 rounded-xl px-3 text-foreground-600 transition-colors hover:bg-white/5 hover:text-white">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="shrink-0"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
        <span class="opacity-0 transition-opacity duration-300 group-hover/sidebar:opacity-100 whitespace-nowrap text-sm">Comunidad</span>
      </a>

      <!-- Precios -->
      <a href="/pricing" class="flex h-11 items-center gap-3.5 rounded-xl px-3 text-foreground-600 transition-colors hover:bg-white/5 hover:text-white">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="shrink-0"><path d="M6 3h12l4 6-10 12L2 9Z"></path><path d="M11 3 8 9l4 12 4-12-3-6"></path><path d="M2 9h20"></path></svg>
        <span class="opacity-0 transition-opacity duration-300 group-hover/sidebar:opacity-100 whitespace-nowrap text-sm">Precios</span>
      </a>

      <!-- Afiliados -->
      <a href="/affiliate" class="flex h-11 items-center gap-3.5 rounded-xl px-3 text-foreground-600 transition-colors hover:bg-white/5 hover:text-white">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="shrink-0"><circle cx="12" cy="12" r="10"></circle><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"></path><path d="M12 6v2m0 8v2"></path></svg>
        <span class="opacity-0 transition-opacity duration-300 group-hover/sidebar:opacity-100 whitespace-nowrap text-sm">Afiliados</span>
      </a>

      <!-- Documentación -->
      <a href="/docs" class="flex h-11 items-center gap-3.5 rounded-xl px-3 text-foreground-600 transition-colors hover:bg-white/5 hover:text-white">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="shrink-0"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"></path><path d="M6 6h10M6 10h10"></path></svg>
        <span class="opacity-0 transition-opacity duration-300 group-hover/sidebar:opacity-100 whitespace-nowrap text-sm">Docs</span>
      </a>
    </nav>
  </div>

  <!-- Bottom: Profile & Auth -->
  <div class="flex flex-col gap-2 border-t border-border/60 p-3">
    <!-- Guardados -->
    <a href="/user/saves/companions" class="flex h-10 items-center gap-3.5 rounded-xl px-2.5 text-foreground-600 transition-colors hover:bg-white/5 hover:text-white">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="shrink-0"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"></path></svg>
      <span class="opacity-0 transition-opacity duration-300 group-hover/sidebar:opacity-100 whitespace-nowrap text-xs">Guardados</span>
    </a>

    <!-- Iniciar sesión / Registro button -->
    <button id="sidebar-login-btn" class="flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-primary text-white font-medium shadow-md transition-all hover:bg-primary/90">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="shrink-0"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path><polyline points="10 17 15 12 10 7"></polyline><line x1="15" x2="3" y1="12" y2="12"></line></svg>
      <span class="opacity-0 transition-opacity duration-300 group-hover/sidebar:opacity-100 whitespace-nowrap text-xs">Entrar</span>
    </button>
  </div>
</aside>
`;

// Construct Mobile Drawer Navigation
const mobileDrawerHtml = `
<div id="mobile-nav-drawer" class="fixed inset-0 z-50 transform -translate-x-full transition-transform duration-300 md:hidden bg-background/95 backdrop-blur-xl">
  <div class="flex h-full flex-col justify-between p-6">
    <!-- Header -->
    <div class="flex items-center justify-between border-b border-border pb-4">
      <div class="flex items-center gap-3">
        <img src="/assets/heart_logo_webp_xvZ28ud2VicA.webp" alt="Nectar AI" class="h-8 w-8 object-contain">
        <span class="font-extended text-xl font-bold text-white">Nectar AI</span>
      </div>
      <button id="mobile-drawer-close" aria-label="Cerrar menú" class="rounded-full p-2 text-foreground-400 hover:bg-white/10 hover:text-white">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"></path></svg>
      </button>
    </div>

    <!-- Navigation Links -->
    <nav class="flex flex-col gap-2 py-6">
      <a href="/" class="flex items-center gap-4 rounded-xl bg-primary/10 px-4 py-3 text-primary font-medium text-lg">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>
        Explorar
      </a>
      <a href="/messages" class="flex items-center gap-4 rounded-xl px-4 py-3 text-foreground hover:bg-white/5 text-lg">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path></svg>
        Mensajes
      </a>
      <a href="/girls/create" class="flex items-center gap-4 rounded-xl px-4 py-3 text-foreground hover:bg-white/5 text-lg">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"></path></svg>
        Crear Compañera
      </a>
      <a href="/community" class="flex items-center gap-4 rounded-xl px-4 py-3 text-foreground hover:bg-white/5 text-lg">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle></svg>
        Comunidad
      </a>
      <a href="/pricing" class="flex items-center gap-4 rounded-xl px-4 py-3 text-foreground hover:bg-white/5 text-lg">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 3h12l4 6-10 12L2 9Z"></path></svg>
        Precios
      </a>
      <a href="/affiliate" class="flex items-center gap-4 rounded-xl px-4 py-3 text-foreground hover:bg-white/5 text-lg">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"></path></svg>
        Afiliados
      </a>
      <a href="/docs" class="flex items-center gap-4 rounded-xl px-4 py-3 text-foreground hover:bg-white/5 text-lg">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"></path></svg>
        Documentación
      </a>
    </nav>

    <!-- Bottom Actions -->
    <div class="flex flex-col gap-3 border-t border-border pt-4">
      <button class="inline-flex w-full items-center justify-center rounded-full bg-primary px-5 py-3 text-base font-semibold text-white shadow-lg transition-transform active:scale-95">
        Únete Gratis
      </button>
      <button class="inline-flex w-full items-center justify-center rounded-full border border-border bg-background-500 px-5 py-3 text-base font-medium text-foreground hover:bg-background-400">
        Iniciar Sesión
      </button>
    </div>
  </div>
</div>
`;

// Inject sidebar right before `<div class="md:ml-sidebar-space-collapsed"`
html = html.replace('<div class="md:ml-sidebar-space-collapsed">', `${desktopSidebarHtml}${mobileDrawerHtml}<div class="md:ml-sidebar-space-collapsed">`);

// Replace FAQ buttons with interactive accordion setup
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
    .group\\/companion-card {
      transition: transform 0.25s ease, box-shadow 0.25s ease !important;
    }
    .group\\/companion-card:hover {
      transform: translateY(-4px) !important;
      box-shadow: 0 12px 30px -10px rgba(255, 71, 71, 0.15) !important;
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

