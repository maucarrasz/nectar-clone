const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const assetsMapping = JSON.parse(fs.readFileSync(path.join(rootDir, 'public/firecrawl_assets_mapping.json'), 'utf8'));

console.log('--- 1. BUILDING HOMEPAGE WITH UNIQUE COMPANIONS, EXPANDABLE SIDEBAR & FILTER DRAWER ---');

let rawHtml = fs.readFileSync('/tmp/firecrawl_nectar_unlocked.html', 'utf8');

// Replace all media URLs with local self-hosted assets
let replacedCount = 0;
for (const [remoteUrl, localUrl] of Object.entries(assetsMapping)) {
  if (rawHtml.includes(remoteUrl)) {
    rawHtml = rawHtml.split(remoteUrl).join(localUrl);
    replacedCount++;
  }
}
console.log(`Replaced ${replacedCount} asset URLs with unique local files!`);

// Replace internal URLs
rawHtml = rawHtml.replace(/https:\/\/nectar\.ai\/es\/pricing/g, '/pricing');
rawHtml = rawHtml.replace(/https:\/\/nectar\.ai\/pricing/g, '/pricing');
rawHtml = rawHtml.replace(/https:\/\/nectar\.ai\/affiliate/g, '/affiliate');
rawHtml = rawHtml.replace(/https:\/\/nectar\.ai\/community/g, '/community');
rawHtml = rawHtml.replace(/https:\/\/nectar\.ai\/tag/g, '/tag');
rawHtml = rawHtml.replace(/https:\/\/docs\.nectar\.ai\/?/g, '/docs');
rawHtml = rawHtml.replace(/https:\/\/nectar\.ai\/es\/girls\/create/g, '/girls/create');
rawHtml = rawHtml.replace(/https:\/\/nectar\.ai\/girls\/create/g, '/girls/create');
rawHtml = rawHtml.replace(/https:\/\/nectar\.ai\/es\/fantasy\/create/g, '/create');
rawHtml = rawHtml.replace(/https:\/\/nectar\.ai\/create/g, '/create');
rawHtml = rawHtml.replace(/https:\/\/nectar\.ai\/es\/messages\?[^"]+/g, '/messages');
rawHtml = rawHtml.replace(/https:\/\/nectar\.ai\/messages/g, '/messages');
rawHtml = rawHtml.replace(/https:\/\/nectar\.ai\/user\/saves\/companions/g, '/user/saves/companions');
rawHtml = rawHtml.replace(/https:\/\/nectar\.ai\/u\/[a-zA-Z0-9_]+/g, '/u/username');
rawHtml = rawHtml.replace(/https:\/\/nectar\.ai\/dashboard/g, '/dashboard');
rawHtml = rawHtml.replace(/https:\/\/nectar\.ai\/es/g, '/');
rawHtml = rawHtml.replace(/https:\/\/nectar\.ai\/assets\//g, '/assets/');

// Extract body inner content
const bodyStart = rawHtml.indexOf('<body');
const bodyOpenEnd = rawHtml.indexOf('>', bodyStart) + 1;
const bodyEnd = rawHtml.indexOf('</body>');
let bodyContent = rawHtml.slice(bodyOpenEnd, bodyEnd);

// 1. Remove the static filter column from the desktop layout so cards span full width (5 columns)
// In firecrawl HTML: <div class="grid gap-4 grid-cols-[1fr_256px]" ...> -> full width 1-column grid container
bodyContent = bodyContent.replace(
  'grid-cols-[1fr_256px]',
  'grid-cols-1'
);

// Hide the static right filter sidebar in the DOM
bodyContent = bodyContent.replace(
  '</div></div><div><div class="sticky top-navbar  h-fit pt-2.5 md:top-0"><div class="flex h-fit flex-col rounded-2xl border">',
  '</div></div><div class="hidden"><div class="sticky top-navbar h-fit pt-2.5 md:top-0"><div class="flex h-fit flex-col rounded-2xl border">'
);

// 2. Inject the funnel filter button [Y] 2 on the right side of the search bar on ALL screen sizes (desktop, tablet, mobile)
const filterTriggerBtn = `
  <button id="filter-drawer-trigger" class="relative flex size-10 shrink-0 items-center justify-center rounded-full border border-background-200 bg-background-500 text-foreground-400 hover:text-white transition-colors cursor-pointer" aria-label="Abrir filtros">
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
    <span class="absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full bg-[#ef4444] text-[10px] font-bold text-white">2</span>
  </button>
`;
bodyContent = bodyContent.replace(
  '<input placeholder="Buscar" class="h-full w-0 flex-grow bg-transparent pl-1.5 pr-2.5 outline-none" type="text" value=""></div></div></div></div>',
  `<input placeholder="Buscar" class="h-full w-0 flex-grow bg-transparent pl-1.5 pr-2.5 outline-none" type="text" value=""></div></div>${filterTriggerBtn}</div></div>`
);

// 3. Exact Expandable Left Sidebar matching Photo 2 (w-[68px] default -> w-[250px] on hover)
const expandableLeftSidebarHtml = `
<aside id="desktop-sidebar" class="group/sidebar fixed inset-y-0 left-0 z-50 hidden flex-col justify-between border-r border-[#1f1f23] bg-[#09090b] transition-all duration-300 ease-in-out md:flex w-[68px] hover:w-[250px] hover:shadow-2xl hover:shadow-black overflow-hidden select-none">
  <!-- Top items -->
  <div class="flex flex-col py-4 px-3 w-[250px]">
    <!-- Brand Logo -->
    <a href="/" class="flex items-center gap-3 h-10 px-1 rounded-xl transition-colors hover:bg-white/5" title="Nectar AI">
      <img src="/assets/heart_logo_webp_xvZ28ud2VicA.webp" alt="Nectar" class="size-8 shrink-0 object-contain">
      <span class="font-extended text-xl font-bold tracking-tight text-white opacity-0 transition-opacity duration-200 group-hover/sidebar:opacity-100 whitespace-nowrap">Nectar</span>
    </a>

    <!-- Nav Items -->
    <nav class="mt-6 flex flex-col gap-1.5">
      <!-- Inicio -->
      <a href="/" class="flex h-11 items-center gap-3.5 rounded-xl px-2.5 bg-white/10 text-white transition-colors" title="Inicio">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="shrink-0"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
        <span class="opacity-0 transition-opacity duration-200 group-hover/sidebar:opacity-100 whitespace-nowrap text-sm font-medium">Inicio</span>
      </a>

      <!-- Chats -->
      <a href="/messages" class="flex h-11 items-center gap-3.5 rounded-xl px-2.5 text-foreground-400 hover:bg-white/5 hover:text-white transition-colors" title="Chats">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="shrink-0"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path></svg>
        <span class="opacity-0 transition-opacity duration-200 group-hover/sidebar:opacity-100 whitespace-nowrap text-sm font-medium">Chats</span>
      </a>

      <!-- + Crear -->
      <a href="/girls/create" class="flex h-11 items-center gap-3.5 rounded-xl px-2.5 text-foreground-400 hover:bg-white/5 hover:text-white transition-colors" title="Crear">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="shrink-0"><path d="M12 5v14M5 12h14"></path></svg>
        <span class="opacity-0 transition-opacity duration-200 group-hover/sidebar:opacity-100 whitespace-nowrap text-sm font-medium">Crear</span>
      </a>

      <!-- Generar -->
      <a href="/create" class="flex h-11 items-center gap-3.5 rounded-xl px-2.5 text-foreground-400 hover:bg-white/5 hover:text-white transition-colors" title="Generar">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="shrink-0"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3z"></path></svg>
        <span class="opacity-0 transition-opacity duration-200 group-hover/sidebar:opacity-100 whitespace-nowrap text-sm font-medium">Generar</span>
      </a>

      <!-- Comunidad ¡Nuevo! -->
      <a href="/community" class="flex h-11 items-center gap-3.5 rounded-xl px-2.5 text-foreground-400 hover:bg-white/5 hover:text-white transition-colors" title="Comunidad">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="shrink-0"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
        <span class="opacity-0 transition-opacity duration-200 group-hover/sidebar:opacity-100 whitespace-nowrap text-sm font-medium flex items-center gap-1.5">
          Comunidad <span class="rounded bg-[#ef4444]/20 px-1.5 py-0.5 text-[10px] font-semibold text-[#ef4444]">¡Nuevo!</span>
        </span>
      </a>
    </nav>

    <!-- Red Mejorar CTA button -->
    <div class="mt-4">
      <a href="/pricing" class="flex h-11 items-center gap-3 rounded-2xl bg-gradient-to-r from-[#ff334b] to-[#ff4747] px-3 font-semibold text-white shadow-lg shadow-red-500/25 transition-transform hover:scale-[1.02] active:scale-[0.98]">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="shrink-0"><path d="M6 3h12l4 6-10 12L2 9Z"></path></svg>
        <span class="opacity-0 transition-opacity duration-200 group-hover/sidebar:opacity-100 whitespace-nowrap text-sm">Mejorar</span>
      </a>
    </div>

    <!-- Muted Links (Photo 2) -->
    <div class="mt-3 px-1 text-[11px] text-foreground-500 leading-relaxed opacity-0 transition-opacity duration-200 group-hover/sidebar:opacity-100 whitespace-nowrap">
      <div class="flex items-center gap-1.5">
        <a href="/tag" class="hover:text-white">Love Island</a> •
        <a href="https://discord.gg" target="_blank" class="hover:text-white">Discord</a> •
        <a href="https://reddit.com" target="_blank" class="hover:text-white">Reddit</a>
      </div>
      <div class="flex items-center gap-1.5 mt-0.5">
        <a href="https://twitter.com" target="_blank" class="hover:text-white">Twitter</a> •
        <a href="/tag" class="hover:text-white">Tags</a> •
        <a href="/affiliate" class="hover:text-white">Afiliados</a>
      </div>
      <div class="mt-0.5">
        <a href="/docs" class="hover:text-white">Documentación</a>
      </div>
    </div>
  </div>

  <!-- Bottom items -->
  <div class="flex flex-col py-3 px-3 w-[250px] border-t border-[#1f1f23] gap-3">
    <!-- Language button -->
    <button class="flex h-10 items-center gap-3 rounded-xl px-2.5 text-foreground-400 hover:bg-white/5 hover:text-white transition-colors" title="Idioma">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="shrink-0"><path d="m5 8 6 6"></path><path d="m4 14 6-6 2-3"></path><path d="M2 5h12"></path><path d="M7 2h1"></path><path d="m22 22-5-10-5 10"></path><path d="M14 18h6"></path></svg>
      <span class="opacity-0 transition-opacity duration-200 group-hover/sidebar:opacity-100 whitespace-nowrap text-sm">Idioma</span>
    </button>

    <!-- Gender Segmented Control (Mujer / Hombre / Anime) -->
    <div class="flex h-9 items-center rounded-xl bg-[#18181b] p-1 text-xs font-medium text-foreground-400">
      <button class="flex-1 rounded-lg bg-white/10 text-white py-1 text-center transition-colors">Mujer</button>
      <button class="flex-1 rounded-lg hover:text-white py-1 text-center transition-colors">Hombre</button>
      <button class="flex-1 rounded-lg hover:text-white py-1 text-center transition-colors">Anime</button>
    </div>

    <!-- User Profile Footer -->
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
`;

// 4. Exact Right Filter Drawer matching Photo 4
const filterDrawerHtml = `
<!-- Filter Drawer Backdrop -->
<div id="filter-drawer-backdrop" class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm opacity-0 pointer-events-none transition-opacity duration-300"></div>

<!-- Slide-Out Filter Drawer Panel -->
<aside id="filter-drawer-panel" class="fixed top-0 right-0 bottom-0 z-50 w-[350px] max-w-[90vw] bg-[#0c0c0e] border-l border-[#1f1f23] transform translate-x-full transition-transform duration-300 ease-in-out flex flex-col p-5 overflow-y-auto select-none shadow-2xl">
  <!-- Header -->
  <div class="flex items-center justify-between pb-4 border-b border-[#1f1f23]">
    <div class="flex items-center gap-2">
      <span class="font-bold text-base text-white">Filtros</span>
      <span class="flex size-5 items-center justify-center rounded-full bg-[#ef4444] text-xs font-bold text-white">2</span>
    </div>
    <div class="flex items-center gap-4">
      <button id="filter-reset-btn" class="text-xs text-[#ef4444] hover:underline font-medium">Restablecer</button>
      <button id="filter-drawer-close" class="text-foreground-400 hover:text-white p-1" aria-label="Cerrar filtros">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"></path></svg>
      </button>
    </div>
  </div>

  <!-- Solo grupos switch -->
  <div class="flex items-center justify-between py-4 border-b border-[#1f1f23]">
    <div>
      <div class="flex items-center gap-2">
        <span class="font-medium text-sm text-white">Solo grupos</span>
        <span class="rounded bg-[#ef4444]/20 px-1.5 py-0.5 text-[10px] font-semibold text-[#ef4444]">Nuevo</span>
      </div>
      <p class="text-xs text-foreground-400 mt-0.5">Fantasías con varios companions.</p>
    </div>
    <button id="solo-grupos-toggle" role="switch" aria-checked="false" class="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-[#27272a] transition-colors duration-200 ease-in-out focus:outline-none">
      <span class="pointer-events-none inline-block size-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out translate-x-0"></span>
    </button>
  </div>

  <!-- Tags Section -->
  <div class="py-4">
    <div class="flex items-center justify-between mb-3">
      <div class="flex items-center gap-2">
        <span class="font-bold text-sm text-white">Tags</span>
        <span class="flex size-5 items-center justify-center rounded-full bg-[#ef4444] text-xs font-bold text-white">2</span>
      </div>
      <button class="text-xs text-[#ef4444] hover:underline font-medium">Restablecer</button>
    </div>

    <!-- Tag Search input -->
    <div class="relative mb-3">
      <input id="drawer-tag-search" placeholder="Buscar tags" class="w-full bg-[#18181b] border border-[#27272a] rounded-xl px-3 py-2 text-sm text-white placeholder:text-foreground-500 outline-none focus:border-primary/50">
      <svg class="absolute right-3 top-2.5 size-4 text-foreground-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
    </div>

    <!-- Sorting -->
    <div class="flex items-center gap-4 text-xs font-medium border-b border-[#1f1f23] pb-2 mb-4">
      <span class="text-foreground-500">Ordenar:</span>
      <button class="text-white border-b-2 border-[#ef4444] pb-1 font-semibold">Predeterminado</button>
      <button class="text-foreground-500 hover:text-white pb-1">A→Z</button>
    </div>

    <!-- Tag categories with + and - buttons matching Photo 4 -->
    <div class="space-y-4 text-sm">
      <div class="space-y-2">
        <div class="flex items-center justify-between py-1 px-2 rounded-lg hover:bg-white/5">
          <div class="flex items-center gap-2.5 text-white">
            <button class="size-5 rounded flex items-center justify-center bg-white/10 hover:bg-white/20 text-xs">+</button>
            <span>🎃 Femenino</span>
          </div>
          <button class="size-5 rounded flex items-center justify-center text-foreground-500 hover:text-white text-xs">-</button>
        </div>
        <div class="flex items-center justify-between py-1 px-2 rounded-lg hover:bg-white/5">
          <div class="flex items-center gap-2.5 text-white">
            <button class="size-5 rounded flex items-center justify-center bg-white/10 hover:bg-white/20 text-xs">+</button>
            <span>🤠 Masculino</span>
          </div>
          <button class="size-5 rounded flex items-center justify-center text-foreground-500 hover:text-white text-xs">-</button>
        </div>
      </div>

      <!-- ESTILO -->
      <div>
        <h4 class="text-[11px] font-bold uppercase tracking-wider text-foreground-500 mb-2">ESTILO</h4>
        <div class="space-y-1.5">
          <div class="flex items-center justify-between py-1 px-2 rounded-lg hover:bg-white/5">
            <div class="flex items-center gap-2.5 text-white">
              <button class="size-5 rounded flex items-center justify-center bg-white/10 hover:bg-white/20 text-xs">+</button>
              <span>📸 Realista</span>
            </div>
            <button class="size-5 rounded flex items-center justify-center text-foreground-500 hover:text-white text-xs">-</button>
          </div>
          <div class="flex items-center justify-between py-1 px-2 rounded-lg hover:bg-white/5">
            <div class="flex items-center gap-2.5 text-white">
              <button class="size-5 rounded flex items-center justify-center bg-white/10 hover:bg-white/20 text-xs">+</button>
              <span>⛩️ Anime</span>
            </div>
            <button class="size-5 rounded flex items-center justify-center text-foreground-500 hover:text-white text-xs">-</button>
          </div>
        </div>
      </div>

      <!-- TIPO -->
      <div>
        <h4 class="text-[11px] font-bold uppercase tracking-wider text-foreground-500 mb-2">TIPO</h4>
        <div class="space-y-1.5">
          <div class="flex items-center justify-between py-1 px-2 rounded-lg hover:bg-white/5">
            <div class="flex items-center gap-2.5 text-white">
              <button class="size-5 rounded flex items-center justify-center bg-white/10 hover:bg-white/20 text-xs">+</button>
              <span>Compañeras</span>
            </div>
            <button class="size-5 rounded flex items-center justify-center text-foreground-500 hover:text-white text-xs">-</button>
          </div>
          <div class="flex items-center justify-between py-1 px-2 rounded-lg hover:bg-white/5">
            <div class="flex items-center gap-2.5 text-white">
              <button class="size-5 rounded flex items-center justify-center bg-white/10 hover:bg-white/20 text-xs">+</button>
              <span>Fantasías</span>
            </div>
            <button class="size-5 rounded flex items-center justify-center text-foreground-500 hover:text-white text-xs">-</button>
          </div>
          <div class="flex items-center justify-between py-1 px-2 rounded-lg hover:bg-white/5">
            <div class="flex items-center gap-2.5 text-white">
              <button class="size-5 rounded flex items-center justify-center bg-white/10 hover:bg-white/20 text-xs">+</button>
              <span>© Oficial</span>
            </div>
            <button class="size-5 rounded flex items-center justify-center text-foreground-500 hover:text-white text-xs">-</button>
          </div>
        </div>
      </div>

      <!-- TAGS -->
      <div>
        <h4 class="text-[11px] font-bold uppercase tracking-wider text-foreground-500 mb-2">TAGS</h4>
        <div class="space-y-1.5">
          <div class="flex items-center justify-between py-1 px-2 rounded-lg hover:bg-white/5">
            <div class="flex items-center gap-2.5 text-white">
              <button class="size-5 rounded flex items-center justify-center bg-white/10 hover:bg-white/20 text-xs">+</button>
              <span>💔 NTR</span>
            </div>
            <button class="size-5 rounded flex items-center justify-center text-foreground-500 hover:text-white text-xs">-</button>
          </div>
          <div class="flex items-center justify-between py-1 px-2 rounded-lg hover:bg-white/5">
            <div class="flex items-center gap-2.5 text-white">
              <button class="size-5 rounded flex items-center justify-center bg-white/10 hover:bg-white/20 text-xs">+</button>
              <span>🔞 NSFW</span>
            </div>
            <button class="size-5 rounded flex items-center justify-center text-foreground-500 hover:text-white text-xs">-</button>
          </div>
          <div class="flex items-center justify-between py-1 px-2 rounded-lg hover:bg-white/5">
            <div class="flex items-center gap-2.5 text-white">
              <button class="size-5 rounded flex items-center justify-center bg-white/10 hover:bg-white/20 text-xs">+</button>
              <span>💋 Dominante</span>
            </div>
            <button class="size-5 rounded flex items-center justify-center text-foreground-500 hover:text-white text-xs">-</button>
          </div>
          <div class="flex items-center justify-between py-1 px-2 rounded-lg hover:bg-white/5">
            <div class="flex items-center gap-2.5 text-white">
              <button class="size-5 rounded flex items-center justify-center bg-white/10 hover:bg-white/20 text-xs">+</button>
              <span>🥺 Sumiso</span>
            </div>
            <button class="size-5 rounded flex items-center justify-center text-foreground-500 hover:text-white text-xs">-</button>
          </div>
          <div class="flex items-center justify-between py-1 px-2 rounded-lg hover:bg-white/5">
            <div class="flex items-center gap-2.5 text-white">
              <button class="size-5 rounded flex items-center justify-center bg-white/10 hover:bg-white/20 text-xs">+</button>
              <span>💕 Romántico</span>
            </div>
            <button class="size-5 rounded flex items-center justify-center text-foreground-500 hover:text-white text-xs">-</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</aside>
`;

// Inject sidebar and filter drawer
bodyContent = bodyContent.replace(
  '<div class="md:ml-sidebar-space-collapsed">',
  `${expandableLeftSidebarHtml}${filterDrawerHtml}<div class="md:ml-sidebar-space-collapsed">`
);

// Assemble complete index.html
const indexHtml = `<!DOCTYPE html>
<html lang="es" class="dark scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>Nectar AI | Crea y Chatea con Compañeras de IA Sin Filtros</title>
  <meta name="description" content="Plataforma líder para crear y chatear con compañeras de IA personalizadas. Generación de imágenes, videos y voz con máxima fidelidad y sin restricciones.">
  <link rel="icon" type="image/webp" href="/assets/heart_logo_webp_xvZ28ud2VicA.webp">
  <link rel="preload" href="/fonts/ABCFavoritVariable_Trial.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="/fonts/ABCFavoritExtendedVariable_Trial.ttf" as="font" type="font/ttf" crossorigin>
  <link rel="stylesheet" href="/original-styles.css">
  <style>
    body { background-color: #09090b !important; color: #f4f4f5 !important; font-family: var(--font-favorit, system-ui, sans-serif); margin: 0; padding: 0; }
    .sticky.top-0 { background-color: rgba(9, 9, 11, 0.85) !important; backdrop-filter: blur(14px) saturate(135%) !important; -webkit-backdrop-filter: blur(14px) saturate(135%) !important; }
    #hero-carousel-track { transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) !important; will-change: transform; }
    .faq-content.open { max-height: 250px !important; }
    .faq-chevron.rotated { transform: rotate(180deg) !important; }
    #age-gate-backdrop.hidden, #age-gate-dialog.hidden { display: none !important; }
  </style>
</head>
<body class="am3G8q_variable _4a5q0W_variable bg-[#09090b] text-[#f4f4f5] antialiased" style="overflow-x: hidden;">
${bodyContent}
<script type="module" src="/src/main.js"></script>
</body>
</html>
`;

// Check tag balance
const openDivs = (indexHtml.match(/<div[\s>]/g) || []).length;
const closeDivs = (indexHtml.match(/<\/div>/g) || []).length;
console.log(`DOM Tag Balance: Open Divs = ${openDivs}, Close Divs = ${closeDivs}, Diff = ${openDivs - closeDivs}`);

fs.writeFileSync(path.join(rootDir, 'index.html'), indexHtml);
console.log('✅ index.html updated successfully!');
