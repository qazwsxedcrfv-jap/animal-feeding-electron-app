// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
  base: './', // Electronでローカルファイルをロードするために重要

  // ★★★ この部分を追加・修正します ★★★
  build: {
    outDir: 'docs', // GitHub Pages用にビルド出力先を 'docs' フォルダに変更
  },
});
