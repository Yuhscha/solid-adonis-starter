import { createSignal, createResource } from 'solid-js'
import { generateGreeting, generateMockUser, isValidEmail } from '@solid-adonis-starter/shared'
import type { ApiResponse, UserData } from '@solid-adonis-starter/shared'

type AllTestData = {
  greeting: string
  user: UserData
  emailValidation: {
    valid: boolean
    invalid: boolean
  }
  timestamp: string
}

export default function SharedTest() {
  const [name, setName] = createSignal('SolidStart User')
  const [userId, setUserId] = createSignal(1)
  const [email, setEmail] = createSignal('test@example.com')

  // Fetch data from API
  const [apiData] = createResource(async (): Promise<ApiResponse<AllTestData> | null> => {
    try {
      // Use different URLs for SSR (server-side) and CSR (client-side)
      const isServer = typeof window === 'undefined'
      const baseUrl = isServer ? 'http://backend:8080' : 'http://localhost:8080'
      const response = await fetch(`${baseUrl}/api/shared/all`)
      const data: ApiResponse<AllTestData> = await response.json()
      return data
    } catch (error) {
      console.error('Failed to fetch API data:', error)
      return null
    }
  })

  // Client-side shared functions
  const clientGreeting = () => generateGreeting(name())
  const clientUser = () => generateMockUser(userId())
  const clientEmailValidation = () => isValidEmail(email())

  return (
    <div class="container mx-auto p-8 max-w-4xl">
      <h1 class="text-3xl font-bold mb-8 text-center text-blue-600">Shared Functions Test</h1>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Client-side (Frontend) */}
        <div class="bg-green-50 p-6 rounded-lg border-2 border-green-200">
          <h2 class="text-2xl font-semibold mb-4 text-green-800">🎨 Client-side (Frontend)</h2>

          {/* Greeting Test */}
          <div class="mb-6">
            <h3 class="text-lg font-medium mb-2">Greeting Generator</h3>
            <input
              type="text"
              value={name()}
              onInput={e => setName(e.currentTarget.value)}
              class="w-full p-2 border rounded mb-2"
              placeholder="Enter your name"
            />
            <div class="bg-white p-3 rounded border">
              <strong>Result:</strong>
              <p class="text-sm mt-1">{clientGreeting()}</p>
            </div>
          </div>

          {/* Mock User Test */}
          <div class="mb-6">
            <h3 class="text-lg font-medium mb-2">Mock User Generator</h3>
            <input
              type="number"
              value={userId()}
              onInput={e => setUserId(Number(e.currentTarget.value))}
              class="w-full p-2 border rounded mb-2"
              placeholder="Enter user ID"
            />
            <div class="bg-white p-3 rounded border">
              <strong>Generated User:</strong>
              <pre class="text-sm mt-1 whitespace-pre-wrap">
                {JSON.stringify(clientUser(), null, 2)}
              </pre>
            </div>
          </div>

          {/* Email Validation Test */}
          <div class="mb-4">
            <h3 class="text-lg font-medium mb-2">Email Validation</h3>
            <input
              type="email"
              value={email()}
              onInput={e => setEmail(e.currentTarget.value)}
              class="w-full p-2 border rounded mb-2"
              placeholder="Enter email address"
            />
            <div class="bg-white p-3 rounded border">
              <strong>Is Valid:</strong>
              <span
                class={`ml-2 px-2 py-1 rounded text-sm ${
                  clientEmailValidation()
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {clientEmailValidation() ? '✓ Valid' : '✗ Invalid'}
              </span>
            </div>
          </div>
        </div>

        {/* Server-side (Backend API) */}
        <div class="bg-blue-50 p-6 rounded-lg border-2 border-blue-200">
          <h2 class="text-2xl font-semibold mb-4 text-blue-800">🚀 Server-side (Backend API)</h2>

          <div class="space-y-4">
            {apiData.loading && (
              <div class="text-center py-4">
                <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto" />
                <p class="mt-2 text-gray-600">Loading API data...</p>
              </div>
            )}

            {apiData.error && (
              <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                <strong>API Error:</strong> Failed to fetch data from backend
                <p class="text-sm mt-1">Make sure the backend server is running on port 8080</p>
              </div>
            )}

            {apiData() && apiData()?.success && (
              <div class="bg-white p-4 rounded border">
                <h3 class="text-lg font-medium mb-2 text-green-600">✓ API Response Success</h3>
                <p class="text-sm text-gray-600 mb-3">Timestamp: {apiData()?.data?.timestamp}</p>
                <div class="space-y-3">
                  <div>
                    <strong>Greeting:</strong>
                    <p class="text-sm mt-1 bg-gray-50 p-2 rounded">{apiData()?.data?.greeting}</p>
                  </div>
                  <div>
                    <strong>Generated User:</strong>
                    <pre class="text-sm mt-1 bg-gray-50 p-2 rounded whitespace-pre-wrap">
                      {JSON.stringify(apiData()?.data?.user, null, 2)}
                    </pre>
                  </div>
                  <div>
                    <strong>Email Validation Tests:</strong>
                    <div class="text-sm mt-1 bg-gray-50 p-2 rounded">
                      <p>
                        test@example.com:{' '}
                        <span class="text-green-600">
                          ✓ {apiData()?.data?.emailValidation?.valid ? 'Valid' : 'Invalid'}
                        </span>
                      </p>
                      <p>
                        invalid-email:{' '}
                        <span class="text-red-600">
                          ✗ {apiData()?.data?.emailValidation?.invalid ? 'Valid' : 'Invalid'}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Shared Package Info */}
      <div class="mt-8 bg-gray-50 p-6 rounded-lg border">
        <h2 class="text-xl font-semibold mb-4">📦 Shared Package Info</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <strong>Functions Used:</strong>
            <ul class="list-disc ml-5 mt-2 space-y-1">
              <li>
                <code>generateGreeting()</code>
              </li>
              <li>
                <code>generateMockUser()</code>
              </li>
              <li>
                <code>isValidEmail()</code>
              </li>
              <li>
                <code>formatTimestamp()</code>
              </li>
              <li>
                <code>createApiResponse()</code>
              </li>
            </ul>
          </div>
          <div>
            <strong>Types Used:</strong>
            <ul class="list-disc ml-5 mt-2 space-y-1">
              <li>
                <code>ApiResponse&lt;T&gt;</code>
              </li>
              <li>
                <code>UserData</code>
              </li>
            </ul>
          </div>
        </div>
        <p class="mt-4 text-gray-600">
          This page demonstrates that the shared package works correctly in both frontend and
          backend environments. The same functions and types are being used on both sides, ensuring
          consistency across the full stack.
        </p>
      </div>
    </div>
  )
}
