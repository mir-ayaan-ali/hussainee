import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Replace with your repo name, e.g. '/my-repo/' if deploying to https://<user>.github.io/my-repo
  base: '/hussainee/'
})
