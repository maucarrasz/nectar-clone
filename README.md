# Nectar AI Clone — 100% Fidelity (12 Subpáginas)

Clon autónomo de alta fidelidad de [Nectar AI](https://nectar.ai) desarrollado con React 18, Vite, Tailwind CSS y assets 100% locales según el estándar de Open Lovable.

---

## 🚀 Características y Rutas Incluidas

1. **`/` (Inicio / Landing)**: Hero con tipografía Favorit original, carruseles continuos de 60fps, pilares de valor, catálogo filtrable por categorías y acordeón de preguntas frecuentes (FAQ).
2. **`/messages` (Mensajería & Chat IA)**: Panel de conversaciones, chat reactivo en tiempo real con simulación de streaming, reproductor de notas de voz con forma de onda y chips de acciones rápidas.
3. **`/create` (Hub de Generación Multimedia)**: Selector de imágenes y videos, ratio de aspecto (1:1, 9:16, 16:9), estilos visuales, mejora de prompts asistida por IA y galería de descargas.
4. **`/girls/create` (Creador de Compañeras)**: Asistente multicapa de 4 pasos (estilo realista/anime, rasgos físicos, personalidad, selección de voz) con vista previa interactiva en vivo con video local.
5. **`/community` (Galería Comunitaria)**: Feed de creaciones públicas, herramientas comunitarias (Prompt Architect, Character Builder) y concursos de creadores.
6. **`/pricing` (Planes y Precios)**: Selector mensual/anual (-20%), tiers Starter, Pro y Unlimited, comparativa de características y métodos de pago discretos (Visa, Mastercard, Crypto).
7. **`/tag` (Explorador de Etiquetas)**: Nube de más de 15 arquetipos y categorías con filtrado instantáneo de personajes.
8. **`/affiliate` (Programa de Afiliados)**: Calculadora de ingresos por referidos en tiempo real (RevShare hasta 40% o $40 CPA) y panel de comisiones.
9. **`/user/saves/companions` (Colección Guardada)**: Marcadores y me gusta con opciones de interacción rápida.
10. **`/u/username` (Perfil de Creador)**: Perfil público con insignias verificadas, estadísticas de seguidores/chats y catálogo de creaciones.
11. **`/dashboard` (Panel de Usuario)**: Métricas de uso, balance de créditos, historial y gestión de API Keys.
12. **`/docs` (Documentación Oficial)**: Portal de guías, bloques de código con botón de copiado y tutoriales paso a paso.

---

## 🛠️ Stack Tecnológico

- **Framework**: React 18 + Vite 6
- **Estilos**: Tailwind CSS + Hojas de estilo originales depuradas (`original-styles.css`)
- **Fuentes**: ABCFavorit Variable & ABCFavoritExtended Variable locales
- **Iconografía**: Lucide React + SVGs originales
- **Video & Multimedia**: Videos MP4 y WebPs 100% auto-hospedados en `public/` (cumpliendo con la regla de cero dependencias externas)

---

## 💻 Instalación y Uso Local

```bash
# 1. Instalar dependencias
pnpm install # o npm install

# 2. Iniciar servidor de desarrollo
pnpm dev

# 3. Compilar para producción
pnpm build
```

---

## 🌐 Despliegue en Vercel

Configurado con `vercel.json` para gestionar el enrutamiento SPA de las 12 subpáginas sin recargas ni errores 404.

