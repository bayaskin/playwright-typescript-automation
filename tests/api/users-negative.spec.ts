import { test, expect } from '../../src/fixtures/test.fixture';

test.describe('Users API - Negative scenarios', () => {
  test('should return an empty object for a nonexistent user', async ({
    request,
  }) => {
    const response = await request.get(
      'https://jsonplaceholder.typicode.com/users/999999'
    );

    expect(response.status()).toBe(404);
  });

  test('should reject an invalid user ID format', async ({ request }) => {
    const response = await request.get(
      'https://jsonplaceholder.typicode.com/users/invalid'
    );

    expect(response.status()).toBe(404);
  });
});
