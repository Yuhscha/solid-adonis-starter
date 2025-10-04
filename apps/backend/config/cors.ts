import { defineConfig } from '@adonisjs/cors'
import env from '#start/env'

/**
 * Configuration options to tweak the CORS policy. The following
 * options are documented on the official documentation website.
 *
 * https://docs.adonisjs.com/guides/security/cors
 */

// Parse allowed origins from environment variable
const getAllowedOrigins = (): string[] => {
  const origins = env.get('CORS_ALLOWED_ORIGINS', '')
  if (!origins) return []
  return origins.split(',').map(origin => origin.trim())
}

const corsConfig = defineConfig({
  enabled: true,
  // Allow frontend URLs from environment variable
  origin: getAllowedOrigins(),
  methods: ['GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  headers: true,
  exposeHeaders: [],
  credentials: true,
  maxAge: 90,
})

export default corsConfig
