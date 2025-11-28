import { defineConfig, loadEnv } from 'vite'

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
    server: {
      port: 4173,
      host: 'localhost'
    },
    preview: {
      port: 4173,
      host: 'localhost'
    }
  }
})

