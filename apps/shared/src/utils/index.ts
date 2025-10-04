/**
 * Shared utility functions between frontend and backend
 */

import type { ApiResponse } from '../types/api'

export type UserData = {
  id: number
  name: string
  email: string
  createdAt: string
}

/**
 * Format a timestamp to a readable string
 */
export function formatTimestamp(date: Date | string | number): string {
  const d = new Date(date)
  return d
    .toISOString()
    .replace('T', ' ')
    .replace(/\.\d{3}Z$/, ' UTC')
}

/**
 * Generate a mock user data for testing
 */
export function generateMockUser(id: number): UserData {
  const users = ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve']
  const domains = ['example.com', 'test.org', 'demo.net']

  const name = users[id % users.length]
  const domain = domains[id % domains.length]

  return {
    id,
    name,
    email: `${name.toLowerCase()}${id}@${domain}`,
    createdAt: formatTimestamp(new Date()),
  }
}

/**
 * Create a standard API response with timestamp
 */
export function createApiResponse<T>(
  success: boolean,
  message: string,
  data?: T
): ApiResponse<T & { timestamp?: string }> {
  return {
    success,
    message,
    data: data ? { ...data, timestamp: formatTimestamp(new Date()) } : undefined,
  }
}

/**
 * Validate email format (shared validation)
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Generate a greeting message with timestamp
 */
export function generateGreeting(name: string): string {
  const hour = new Date().getHours()
  let timeOfDay = 'day'

  if (hour < 12) {
    timeOfDay = 'morning'
  } else if (hour < 18) {
    timeOfDay = 'afternoon'
  } else {
    timeOfDay = 'evening'
  }

  return `Good ${timeOfDay}, ${name}! Current time: ${formatTimestamp(new Date())}`
}
