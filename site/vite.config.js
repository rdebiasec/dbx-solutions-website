import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
import { defineConfig, loadEnv } from 'vite'

const __dirname = dirname(fileURLToPath(import.meta.url))

const normalizeBase = (value) => {
  if (!value || value === '/') return '/'
  const withLeading = value.startsWith('/') ? value : `/${value}`
  return withLeading.endsWith('/') ? withLeading : `${withLeading}/`
}

// Single source of truth for the Content-Security-Policy applied to every page.
// The dev variant additionally allows the Vite HMR websocket; the production
// variant drops localhost and upgrades insecure requests.
const buildCsp = (isDev) => {
  const directives = [
    "default-src 'self'",
    "img-src 'self' data: https://js.intercomcdn.com https://static.intercomassets.com https://downloads.intercomcdn.com https://gifs.intercomcdn.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://calendar.google.com",
    "font-src 'self' https://fonts.gstatic.com https://js.intercomcdn.com",
    "script-src 'self' 'unsafe-inline' https://calendar.google.com https://widget.intercom.io https://js.intercomcdn.com",
    `connect-src 'self' https://calendar.google.com https://api-iam.intercom.io https://api.intercom.io https://api-ping.intercom.io wss://nexus-websocket-a.intercom.io wss://nexus-websocket-b.intercom.io wss://nexus-europe-websocket.intercom.io${
      isDev ? ' ws://localhost:* http://localhost:*' : ''
    }`,
    "frame-src https://calendar.google.com https://intercom-sheets.com https://www.intercom-reporting.com",
    "object-src 'none'",
    "base-uri 'self'",
    "frame-ancestors 'none'",
    "form-action 'self' https://intercom.help https://api-iam.intercom.io"
  ]
  if (!isDev) directives.push('upgrade-insecure-requests')
  return directives.join('; ')
}

// Injects the CSP + referrer-policy meta tags into the <head> of every HTML
// entry point so security headers are not limited to the homepage.
const securityMetaPlugin = (isDev) => ({
  name: 'dbx-security-meta',
  transformIndexHtml(html) {
    const withoutExisting = html.replace(
      /\s*<meta[^>]*http-equiv=["']Content-Security-Policy["'][^>]*>/gi,
      ''
    )
    const meta = [
      `<meta http-equiv="Content-Security-Policy" content="${buildCsp(isDev)}" />`,
      '<meta name="referrer" content="strict-origin-when-cross-origin" />'
    ].join('\n    ')
    // Inject after the charset meta so the large CSP does not push <meta charset>
    // past the 1024-byte limit browsers use to detect the encoding.
    const charsetMatch = withoutExisting.match(/<meta[^>]*charset=[^>]*>/i)
    if (charsetMatch) {
      return withoutExisting.replace(charsetMatch[0], `${charsetMatch[0]}\n    ${meta}`)
    }
    return withoutExisting.replace(/<head>/i, `<head>\n    ${meta}`)
  }
})

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const base = normalizeBase(env.VITE_BASE_PATH)
  const isDev = command === 'serve'

  return {
    base,
    plugins: [securityMetaPlugin(isDev)],
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
