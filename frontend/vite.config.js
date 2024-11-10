
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',  // Change 'dist' to 'build' if you want the output folder to be named 'build'
  },
 


  
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000', // your backend server
        changeOrigin: true,
      },
    }
  }
})


