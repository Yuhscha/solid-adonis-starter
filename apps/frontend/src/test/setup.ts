// Use Vitest-specific entry to avoid bringing in Jest type definitions
import '@testing-library/jest-dom/vitest'
import { beforeEach, vi } from 'vitest'

// Global test setup
beforeEach(() => {
  // Clear any mocks before each test
  vi.clearAllMocks()
})
