// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })


import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, 
    hmr: {
      host: 'symmetrical-fiesta-4jg5vq9g45wg3jj67-5173.app.github.dev',
      protocol: 'wss',
    },
  },
})
