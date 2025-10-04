import { test } from '@japa/runner'

test.group('Health endpoint', () => {
  test('should return health status', async ({ client, assert }) => {
    const response = await client.get('/health')

    response.assertStatus(200)
    response.assertBodyContains({
      status: 'ok',
    })

    const body = response.body()
    assert.property(body, 'timestamp')
  })

  test('should return valid timestamp format', async ({ client, assert }) => {
    const response = await client.get('/health')
    const body = response.body()

    response.assertStatus(200)

    // Check if timestamp is a valid ISO string
    const timestamp = new Date(body.timestamp)
    assert.equal(timestamp.toISOString(), body.timestamp)
  })

  test('should always return status ok', async ({ client, assert }) => {
    const response = await client.get('/health')

    response.assertStatus(200)
    assert.equal(response.body().status, 'ok')
  })
})
