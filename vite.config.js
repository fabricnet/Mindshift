import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // relative base so the build works at https://<user>.github.io/Mindshift/
  base: './',
  plugins: [react()],
})
