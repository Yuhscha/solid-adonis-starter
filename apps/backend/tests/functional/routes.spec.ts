import { test } from '@japa/runner'

test.group('API Routes', () => {
  test('GET / should return hello world', async ({ client }) => {
    const response = await client.get('/')

    response.assertStatus(200)
    response.assertBodyContains({
      hello: 'world',
    })
  })
})

test.group('Shared API endpoints', () => {
  test('GET /api/shared/greeting with valid name should return greeting', async ({
    client,
    assert,
  }) => {
    const response = await client.get('/api/shared/greeting?name=John')

    response.assertStatus(200)
    response.assertBodyContains({
      success: true,
      message: 'Greeting generated successfully',
    })

    const body = response.body()
    assert.property(body.data, 'greeting')
    assert.property(body.data, 'name')
    assert.equal(body.data.name, 'John')
  })

  test('GET /api/shared/greeting without name should return error', async ({ client }) => {
    const response = await client.get('/api/shared/greeting')

    response.assertStatus(400)
    response.assertBodyContains({
      success: false,
      message: 'Name parameter is required',
    })
  })

  test('GET /api/shared/user with valid ID should return user data', async ({ client }) => {
    const response = await client.get('/api/shared/user?id=1')

    response.assertStatus(200)
    response.assertBodyContains({
      success: true,
      message: 'Mock user generated successfully',
    })
  })

  test('GET /api/shared/user without ID should return error', async ({ client }) => {
    const response = await client.get('/api/shared/user')

    response.assertStatus(400)
    response.assertBodyContains({
      success: false,
      message: 'Valid ID parameter is required',
    })
  })

  test('GET /api/shared/user with invalid ID should return error', async ({ client }) => {
    const response = await client.get('/api/shared/user?id=invalid')

    response.assertStatus(400)
    response.assertBodyContains({
      success: false,
      message: 'Valid ID parameter is required',
    })
  })

  test('GET /api/shared/validate-email with valid email', async ({ client, assert }) => {
    const response = await client.get('/api/shared/validate-email?email=test@example.com')

    response.assertStatus(200)
    response.assertBodyContains({
      success: true,
      message: 'Email validation completed',
    })
    const body = response.body()
    assert.equal(body.data.isValid, true)
    assert.equal(body.data.email, 'test@example.com')
  })

  test('GET /api/shared/validate-email with invalid email', async ({ client, assert }) => {
    const response = await client.get('/api/shared/validate-email?email=invalid-email')

    response.assertStatus(200)
    response.assertBodyContains({
      success: true,
      message: 'Email validation completed',
    })
    const body = response.body()
    assert.equal(body.data.isValid, false)
    assert.equal(body.data.message, 'Invalid email format')
  })

  test('GET /api/shared/validate-email without email should return error', async ({ client }) => {
    const response = await client.get('/api/shared/validate-email')

    response.assertStatus(400)
    response.assertBodyContains({
      success: false,
      message: 'Email parameter is required',
    })
  })

  test('GET /api/shared/all should return all shared data', async ({ client, assert }) => {
    const response = await client.get('/api/shared/all')

    response.assertStatus(200)
    response.assertBodyContains({
      success: true,
      message: 'All shared functions tested successfully',
    })

    const body = response.body()
    assert.property(body.data, 'greeting')
    assert.property(body.data, 'user')
    assert.property(body.data, 'emailValidation')
    assert.equal(body.data.emailValidation.valid, true)
    assert.equal(body.data.emailValidation.invalid, false)
  })
})

test.group('Error handling', () => {
  test('should return 404 for non-existent routes', async ({ client }) => {
    const response = await client.get('/non-existent-route')

    response.assertStatus(404)
  })

  test('should handle invalid API endpoints', async ({ client }) => {
    const response = await client.get('/api/invalid')

    response.assertStatus(404)
  })
})
