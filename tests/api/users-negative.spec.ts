import { test, expect } from '../../src/fixtures/test.fixture';
import { setTestMetadata } from '../../src/utils/allure';

test.describe('Users API - Negative scenarios', () => {
  test('should return 404 for a nonexistent user', async ({
    request,
  }) => {
    await setTestMetadata({
      epic: 'API Automation',
      feature: 'Error Handling',
      story: 'Nonexistent User',
      severity: 'normal',
      tags: ['api', 'negative'],
    });

    const response = await request.get(
      'https://jsonplaceholder.typicode.com/users/999999',
    );

    expect(response.status()).toBe(404);
  });

  test('should return 404 for an invalid user ID', async ({
    request,
  }) => {
    await setTestMetadata({
      epic: 'API Automation',
      feature: 'Error Handling',
      story: 'Invalid User ID',
      severity: 'normal',
      tags: ['api', 'negative'],
    });

    const response = await request.get(
      'https://jsonplaceholder.typicode.com/users/invalid',
    );

    expect(response.status()).toBe(404);
  });
});