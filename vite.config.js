import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// DEPLOY_TARGET steuert den base-Pfad:
//   - nicht gesetzt / 'github-pages' → /SkillForge/ (GitHub Pages)
//   - 'allinkl'                      → /skillforge/ (apps.p3coaching.de)
//   - development                    → / (lokaler Dev-Server)
export default defineConfig(({ mode }) => {
  const target = process.env.DEPLOY_TARGET || 'github-pages'

  let base = '/'
  if (mode === 'production') {
    if (target === 'allinkl') {
      base = '/skillforge/'
    } else {
      base = '/SkillForge/'
    }
  }

  return {
    plugins: [react()],
    base,
    server: {
      port: 5180,
      strictPort: true,
    },
  }
})
