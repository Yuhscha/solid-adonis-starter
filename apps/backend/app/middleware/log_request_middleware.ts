import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import logger from '@adonisjs/core/services/logger'

export default class LogRequestMiddleware {
  async handle({ request, response }: HttpContext, next: NextFn) {
    const startTime = Date.now()

    await next()

    const duration = Date.now() - startTime
    const statusCode = response.getStatus()
    const method = request.method()
    const url = request.url(true)

    logger.info(`${method} ${url} ${statusCode} - ${duration}ms`)
  }
}
