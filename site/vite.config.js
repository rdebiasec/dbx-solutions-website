import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
import { defineConfig, loadEnv } from 'vite'

const __dirname = dirname(fileURLToPath(import.meta.url))

const normalizeBase = (value) => {
  if (!value || value === '/') return '/'
  const withLeading = value.startsWith('/') ? value : `/${value}`
  return withLeading.endsWith('/') ? withLeading : `${withLeading}/`
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const base = normalizeBase(env.VITE_BASE_PATH)

  return {
    base,
    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
          solutions: resolve(__dirname, 'solutions/index.html'),
          services: resolve(__dirname, 'services/index.html'),
          industries: resolve(__dirname, 'industries/index.html'),
          security: resolve(__dirname, 'security/index.html'),
          packages: resolve(__dirname, 'packages/index.html'),
          process: resolve(__dirname, 'process/index.html'),
          about: resolve(__dirname, 'about/index.html'),
          contact: resolve(__dirname, 'contact/index.html'),
          dataHandling: resolve(__dirname, 'data-handling-notice/index.html'),
          responsibleAi: resolve(__dirname, 'responsible-ai-policy/index.html'),
          securityRoadmap: resolve(__dirname, 'security-roadmap/index.html'),
          privacy: resolve(__dirname, 'privacy-policy/index.html'),
          terms: resolve(__dirname, 'terms-of-service/index.html'),
          sms: resolve(__dirname, 'sms-terms/index.html')
        }
      }
    },
    server: {
      port: 4174,
      host: 'localhost'
    },
    preview: {
      port: 4174,
      host: 'localhost'
    }
  }
})

