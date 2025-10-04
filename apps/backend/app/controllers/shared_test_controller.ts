import type { HttpContext } from '@adonisjs/core/http'
import {
  createApiResponse,
  generateMockUser,
  generateGreeting,
  isValidEmail,
} from '@solid-adonis-starter/shared'

export default class SharedTestController {
  /**
   * Test shared greeting function
   */
  async greeting({ request, response }: HttpContext) {
    const { name } = request.qs()

    if (!name) {
      return response.status(400).json(createApiResponse(false, 'Name parameter is required'))
    }

    const greeting = generateGreeting(String(name))

    return response.json(
      createApiResponse(true, 'Greeting generated successfully', {
        greeting,
        name: String(name),
      })
    )
  }

  /**
   * Test shared mock user generation
   */
  async user({ request, response }: HttpContext) {
    const { id } = request.qs()

    if (!id || Number.isNaN(Number(id))) {
      return response.status(400).json(createApiResponse(false, 'Valid ID parameter is required'))
    }

    const userId = Number(id)
    const user = generateMockUser(userId)

    return response.json(createApiResponse(true, 'Mock user generated successfully', user))
  }

  /**
   * Test shared email validation
   */
  async validateEmail({ request, response }: HttpContext) {
    const { email } = request.qs()

    if (!email) {
      return response.status(400).json(createApiResponse(false, 'Email parameter is required'))
    }

    const isValid = isValidEmail(String(email))

    return response.json(
      createApiResponse(true, 'Email validation completed', {
        email: String(email),
        isValid,
        message: isValid ? 'Valid email format' : 'Invalid email format',
      })
    )
  }

  /**
   * Get all test data at once
   */
  async all({ response }: HttpContext) {
    const testData = {
      greeting: generateGreeting('Developer'),
      user: generateMockUser(1),
      emailValidation: {
        valid: isValidEmail('test@example.com'),
        invalid: isValidEmail('invalid-email'),
      },
    }

    return response.json(
      createApiResponse(true, 'All shared functions tested successfully', testData)
    )
  }
}
