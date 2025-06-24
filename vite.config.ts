import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './', // <-- très important pour GitHub Pages à la racine
  plugins: [react()]
})
