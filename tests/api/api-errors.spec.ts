import { test, expect } from '../../src/fixtures/test.fixture';
import { ApiRequestError } from '../../src/api/api-error';

test.describe('API error handling', () => {
  test('should provide structured details for a missing user', async ({
    userApi,
  }) => {
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
