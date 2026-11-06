import { test, expect } from '../../src/fixtures/test.fixture';
import { ApiRequestError } from '../../src/api/api-error';
import { setTestMetadata } from '../../src/utils/allure';

test.describe('API error handling', () => {
  test('should provide structured details for a missing user', async ({
    userApi,
  }) => {
    await setTestMetadata({
      epic: 'API Automation',
      feature: 'Error Handling',
      story: 'Structured API Errors',
      severity: 'critical',
      tags: ['api', 'error-handling'],
    });

    try {
      await userApi.getUser(999999);
      throw new Error('Expected the API request to fail');
    } catch (error) {
      expect(error).toBeInstanceOf(ApiRequestError);

      const apiError = error as ApiRequestError;

      expect(apiError.status).toBe(404);
      expect(apiError.method).toBe('GET');
      expect(apiError.url).toContain('/users/999999');
      expect(apiError.message).toContain('API request failed');
    }
  });
});