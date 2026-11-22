import path from 'node:path'
import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ command, mode }) => {
  if (command === 'build' && process.env.VERCEL === '1') {
    const { VITE_API_BASE_URL } = loadEnv(mode, process.cwd(), 'VITE_')
    let apiUrl: URL
    try {
      apiUrl = new URL(VITE_API_BASE_URL)
    } catch {
      throw new Error('Set VITE_API_BASE_URL in Vercel to the real public HTTPS backend origin before building.')
    }
    const host = apiUrl.hostname.toLowerCase()
    if (apiUrl.protocol !== 'https:' || host === 'localhost' || host.endsWith('.localhost')
      || host === '[::1]' || host === '0.0.0.0' || host.startsWith('127.')
      || apiUrl.username || apiUrl.password || apiUrl.search || apiUrl.hash) {
      throw new Error('VITE_API_BASE_URL must be a public HTTPS backend URL without credentials, query or fragment; localhost is development-only.')
    }
    if (host === process.env.VERCEL_PROJECT_PRODUCTION_URL
      || host === process.env.VERCEL_URL || host === process.env.VERCEL_BRANCH_URL) {
      throw new Error('VITE_API_BASE_URL must point to the backend, not this Vercel frontend.')
    }
    if (apiUrl.pathname.replace(/\/+$/, '').endsWith('/api')) {
      throw new Error('Do not append /api to VITE_API_BASE_URL: request paths already start with /api/.')
    }
  }
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(path.dirname(fileURLToPath(import.meta.url)), './src'),
      },
    },
  }
})
