import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, 
    port: 5173,
    strictPort: true,
    hmr: {
      protocol: 'wss',
      host: 'symmetrical-fiesta-4jg5vq9g45wg3jj67-5173.app.github.dev',
      port: 443,
    },
  },
});
