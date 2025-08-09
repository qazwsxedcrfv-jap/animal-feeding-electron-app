import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa'; // この行は正しいです

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,jpg,jpeg,json}'],
      },
      manifest: {
        name: '飼育データ管理',
        short_name: '飼育管理',
        // GitHub Pagesのパスに合わせて絶対パスで指定
        start_url: '/animal-feeding-electron-app/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#2563eb',
        icons: [
          {
            src: 'icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
  server: {
    port: 5173,
  },
  // ビルドのベースパスも同じパスに設定
  base: '/animal-feeding-electron-app/',
  build: {
    outDir: 'docs',
    rollupOptions: {
      input: {
        // ★★★ この行を修正 ★★★
        main: 'public/index.html',
        // '404': 'public/404.html' // 404.htmlがある場合
      }
    }
  },
});
