import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import checker from 'vite-plugin-checker'
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), checker({
    typescript: {
      tsconfigPath: './tsconfig.app.json', // adds typechecking for dev server
    },
  })],
  build: {
    sourcemap: true,
    rollupOptions: {
      input: {
        app: './src/example/index.html',
      },
    },
  },
  server: {
    open: '/src/example/index.html',
  },
})
