import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        pricing: path.resolve(__dirname, 'pricing/index.html'),
        affiliate: path.resolve(__dirname, 'affiliate/index.html'),
        community: path.resolve(__dirname, 'community/index.html'),
        tag: path.resolve(__dirname, 'tag/index.html'),
        docs: path.resolve(__dirname, 'docs/index.html'),
        messages: path.resolve(__dirname, 'messages/index.html'),
        create: path.resolve(__dirname, 'create/index.html'),
        girlsCreate: path.resolve(__dirname, 'girls/create/index.html'),
        userSaves: path.resolve(__dirname, 'user/saves/companions/index.html'),
        profile: path.resolve(__dirname, 'u/username/index.html'),
        dashboard: path.resolve(__dirname, 'dashboard/index.html'),
      },
    },
  },
  server: {
    port: 5180,
    host: true,
  },
});
