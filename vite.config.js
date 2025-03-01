import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    hmr: {
      host: 'localhost', // Or use '127.0.0.1'
      port: 5173,        // The port where HMR will listen
      protocol: 'ws',    // WebSocket protocol (ws or wss for secure connections)
    },
    watch: {
      usePolling: true,  // This ensures file changes are detected, especially in WSL/Docker
    }
  }
})
