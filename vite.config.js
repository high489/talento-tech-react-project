import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    svgr(),
  ],
  base: '/talento-tech-react-project/',
  resolve: {
    alias: {
      '@public': path.resolve(__dirname, 'public'),
      '@src': path.resolve(__dirname, 'src'),
      '@app': path.resolve(__dirname, 'src/app'),
      '@assets': path.resolve(__dirname, 'src/app/assets'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@ui': path.resolve(__dirname, 'src/ui'),
      '@views': path.resolve(__dirname, 'src/views'),
    },
  },
})