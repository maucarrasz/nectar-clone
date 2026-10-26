const fs = require('fs');
const path = require('path');

const createStudioHtml = `<!DOCTYPE html>
<html lang="es" class="dark scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>Estudio de Creación de Imágenes & Modelos | Nectar AI</title>
  <meta name="description" content="Crea imágenes y modelos personalizados con inteligencia artificial sin restricciones en Nectar">
  <link rel="icon" type="image/webp" href="/assets/heart_logo_webp_xvZ28ud2VicA.webp">
  <link rel="preload" href="/fonts/ABCFavoritVariable_Trial.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="/fonts/ABCFavoritExtendedVariable_Trial.ttf" as="font" type="font/ttf" crossorigin>
  <link rel="stylesheet" href="/original-styles.css">
  <style>
    body { background-color: #09090b !important; color: #f4f4f5 !important; font-family: var(--font-favorit, system-ui, sans-serif); margin: 0; padding: 0; }
    
    /* Cross-hatch pattern for empty state matching Photo 11 */
    .pattern-bg {
      background-color: #09090b;
      background-image: radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 0);
      background-size: 24px 24px;
      background-position: -19px -19px;
    }
  </style>
</head>
<body class="am3G8q_variable _4a5q0W_variable bg-[#09090b] text-[#f4f4f5] antialiased select-none h-screen overflow-hidden">

<div class="flex h-screen w-screen overflow-hidden">

  <!-- 1. Left Expandable Sidebar (matching Photo 2) -->
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
        <a href="/messages" class="flex h-11 items-center gap-3.5 rounded-xl px-2.5 text-foreground-400 hover:bg-white/5 hover:text-white transition-colors" title="Chats">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="shrink-0"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path></svg>
          <span class="opacity-0 transition-opacity duration-200 group-hover/sidebar:opacity-100 whitespace-nowrap text-sm font-medium">Chats</span>
        </a>
        <a href="/girls/create" class="flex h-11 items-center gap-3.5 rounded-xl px-2.5 text-foreground-400 hover:bg-white/5 hover:text-white transition-colors" title="Crear">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="shrink-0"><path d="M12 5v14M5 12h14"></path></svg>
          <span class="opacity-0 transition-opacity duration-200 group-hover/sidebar:opacity-100 whitespace-nowrap text-sm font-medium">Crear</span>
        </a>
        <a href="/create" class="flex h-11 items-center gap-3.5 rounded-xl px-2.5 bg-white/10 text-white transition-colors" title="Generar">
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
    </div>
  </aside>

  <!-- 2. Studio Generation Layout (Photo 11) -->
  <div class="md:ml-[68px] flex-1 flex flex-col md:flex-row h-screen overflow-hidden">

    <!-- Left Controls Studio Panel (w-full md:w-[420px]) -->
    <div class="w-full md:w-[420px] shrink-0 border-r border-[#1f1f23] bg-[#09090b] flex flex-col p-5 overflow-y-auto z-20">
      
      <!-- Tipo Header -->
      <div class="flex items-center gap-2 mb-3 text-sm font-semibold text-white">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
        <span>Tipo</span>
      </div>

      <!-- Type Switch: Imagen vs Video (Photo 11) -->
      <div class="grid grid-cols-2 gap-2 p-1 bg-[#141417] rounded-xl mb-5">
        <button id="type-img-btn" class="flex items-center justify-center gap-2 py-2 rounded-lg bg-[#27272a] text-white text-xs font-semibold shadow">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
          Imagen
        </button>
        <button id="type-vid-btn" class="flex items-center justify-center gap-2 py-2 rounded-lg text-foreground-400 hover:text-white text-xs font-semibold">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m22 8-6 4 6 4V8Z"/><rect width="14" height="12" x="2" y="6" rx="2"/></svg>
          Video
        </button>
      </div>

      <!-- Base Model Selector Card (Photo 11) -->
      <div class="flex items-center justify-between p-3 rounded-2xl bg-[#141417] border border-[#27272a] hover:border-[#3f3f46] transition-colors cursor-pointer mb-5">
        <div class="flex items-center gap-3">
          <img src="/assets/companions/comp_cd451e4d-cf60-4c51-ae9c-289ac3c2e800.webp" class="size-11 rounded-xl object-cover shrink-0">
          <div>
            <p class="text-xs text-foreground-400">Modelo</p>
            <div class="flex items-center gap-2">
              <span class="text-sm font-semibold text-white">Nectar modelo base</span>
              <span class="rounded bg-[#ef4444]/20 px-1.5 py-0.5 text-[10px] font-bold text-[#ef4444]">SFW</span>
            </div>
          </div>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-foreground-400"><path d="m6 9 6 6 6-6"/></svg>
      </div>

      <!-- DESCRIPCIÓN - Describe a tu compañero ideal (Photo 11) -->
      <div class="mb-5">
        <div class="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-wider text-white">
          <span>≡ DESCRIPCIÓN</span>
          <span class="text-foreground-400 font-normal">- Describe a tu compañero ideal</span>
        </div>
        
        <div class="relative rounded-2xl bg-[#141417] border border-[#27272a] focus-within:border-[#3f3f46] p-3">
          <textarea id="prompt-input" rows="4" placeholder="Introduce tu prompt aquí" class="w-full bg-transparent text-sm text-white placeholder:text-foreground-500 outline-none resize-none"></textarea>
          
          <div class="flex justify-end mt-2">
            <button id="enhance-prompt-btn" type="button" class="flex items-center gap-1.5 rounded-full bg-white/10 hover:bg-white/20 px-3 py-1 text-xs font-semibold text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3z"/></svg>
              Mejorar + 5
            </button>
          </div>
        </div>
      </div>

      <!-- Collapsible Options with locks (Photo 11) -->
      <div class="space-y-3 mb-6">
        <div class="flex items-center justify-between p-3 rounded-xl bg-[#141417] border border-[#27272a] text-xs">
          <div class="flex items-center gap-2 text-white font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3z"/></svg>
            <span>ALTA RESOLUCIÓN</span>
          </div>
          <span class="flex items-center gap-1 font-bold text-[#ef4444]">
            🔒 ULT
          </span>
        </div>

        <div class="flex items-center justify-between p-3 rounded-xl bg-[#141417] border border-[#27272a] text-xs">
          <div class="flex items-center gap-2 text-white font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="18" x="3" y="3" rx="2"/></svg>
            <span>DIMENSIONES</span>
          </div>
          <span class="flex items-center gap-1 font-bold text-[#ef4444]">
            🔒 ULTIMATE
          </span>
        </div>
      </div>

      <!-- Big Red Crear Button (Photo 11) -->
      <div class="mt-auto pt-4">
        <button id="generate-crear-btn" class="w-full h-12 rounded-full bg-[#ef4444] text-white font-bold text-sm shadow-lg shadow-red-500/25 hover:bg-[#dc2626] transition-transform active:scale-[0.98]">
          Crear
        </button>
      </div>

    </div>

    <!-- Right Panel: Creations Gallery & State (Photo 11) -->
    <div class="flex-1 flex flex-col h-full overflow-hidden bg-[#09090b]">
      
      <!-- Top Subnav (Photo 11) -->
      <div class="h-14 border-b border-[#1f1f23] px-6 flex items-center justify-between">
        <!-- Tabs: Mis Creaciones, Mis Me Gusta, Sugeridos NEW -->
        <div class="flex items-center gap-3">
          <button class="px-4 py-1.5 rounded-full bg-[#27272a] text-xs font-semibold text-white">Mis Creaciones</button>
          <button class="px-4 py-1.5 rounded-full text-xs font-medium text-foreground-400 hover:text-white transition-colors">Mis Me Gusta</button>
          <button class="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium text-foreground-400 hover:text-white transition-colors">
            Sugeridos <span class="rounded bg-[#ef4444] px-1.5 py-0.2 text-[9px] font-bold text-white uppercase">NEW</span>
          </button>
        </div>

        <!-- Action tools -->
        <div class="flex items-center gap-3 text-xs text-foreground-400">
          <button class="flex items-center gap-1.5 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
            Seleccionar
          </button>
          <button class="hover:text-white transition-colors p-1" title="Ajustes de visualización">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
          </button>
        </div>
      </div>

      <!-- Main Gallery Body (Empty state with Pattern BG matching Photo 11) -->
      <div id="gallery-container" class="pattern-bg flex-1 flex flex-col items-center justify-center p-8 overflow-y-auto">
        
        <div id="empty-state-view" class="text-center max-w-sm">
          <h3 class="text-base font-medium text-white mb-1.5">Aún no has creado ninguna imagen.</h3>
          <p class="text-xs text-foreground-500">Cuando crees una foto, aparecerá aquí.</p>
        </div>

        <!-- Generated Images Grid (hidden initially, populated on Crear click) -->
        <div id="generated-grid" class="hidden w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        </div>

      </div>

    </div>

  </div>
</div>

<script>
  document.addEventListener('DOMContentLoaded', () => {
    const promptInput = document.getElementById('prompt-input');
    const enhanceBtn = document.getElementById('enhance-prompt-btn');
    const crearBtn = document.getElementById('generate-crear-btn');
    const emptyState = document.getElementById('empty-state-view');
    const generatedGrid = document.getElementById('generated-grid');

    if (enhanceBtn && promptInput) {
      enhanceBtn.addEventListener('click', () => {
        const val = promptInput.value.trim();
        const addition = 'ultra-realistic, 8k resolution, cinematic lighting, photorealistic masterpiece, natural skin texture, masterpiece';
        promptInput.value = val ? \`\${val}, \${addition}\` : \`Stunning elegant portrait, \${addition}\`;
      });
    }

    if (crearBtn && promptInput) {
      crearBtn.addEventListener('click', () => {
        const text = promptInput.value.trim() || 'Compañera elegante';
        crearBtn.textContent = 'Generando...';
        crearBtn.classList.add('opacity-70');

        setTimeout(() => {
          crearBtn.textContent = 'Crear';
          crearBtn.classList.remove('opacity-70');

          if (emptyState) emptyState.classList.add('hidden');
          if (generatedGrid) {
            generatedGrid.classList.remove('hidden');
            const sampleImgs = [
              '/assets/companions/comp_f529b6ca-7a25-49ff-313e-3b39a8ba6400.webp',
              '/assets/companions/comp_da4c8acd-39df-48d0-8de0-21558864e700.webp',
              '/assets/companions/comp_930a703b-ea72-4254-8269-c8fcb25d9200.webp',
              '/assets/companions/comp_cd451e4d-cf60-4c51-ae9c-289ac3c2e800.webp'
            ];
            const randomImg = sampleImgs[Math.floor(Math.random() * sampleImgs.length)];

            const card = document.createElement('div');
            card.className = 'group relative aspect-[3/4] rounded-2xl overflow-hidden bg-[#18181b] border border-[#27272a] shadow-xl';
            card.innerHTML = \`
              <img src="\${randomImg}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
              <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-between">
                <div class="flex justify-end">
                  <button class="p-1.5 rounded-full bg-black/60 text-white hover:text-red-400">♥</button>
                </div>
                <div>
                  <p class="text-xs text-white truncate font-medium">\${text}</p>
                </div>
              </div>
            \`;
            generatedGrid.prepend(card);
          }
        }, 1200);
      });
    }
  });
</script>
</body>
</html>
`;

fs.writeFileSync(path.join(__dirname, '../create/index.html'), createStudioHtml);
console.log('✅ create/index.html successfully updated with Photo 11 Generation Studio!');
