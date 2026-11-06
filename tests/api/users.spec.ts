import { test, expect } from '../../src/fixtures/test.fixture';
import { createUser } from '../../src/utils/user.factory';
import { setTestMetadata } from '../../src/utils/allure';

test.describe('Users API', () => {
  test('should retrieve a user by ID', async ({ userApi }) => {
    await setTestMetadata({
      epic: 'API Automation',
      feature: 'User Management',
      story: 'Retrieve User',
      severity: 'critical',
      tags: ['api', 'regression'],
    });

    const user = await test.step('Retrieve user with ID 1', async () => {
      return userApi.getUser(1);
    });

    await test.step('Validate user response', async () => {
      expect(user.id).toBe(1);
      expect(user.name).toBeTruthy();
      expect(user.email).toContain('@');
    });
  });

  test('should create a user', async ({ userApi }) => {
    await setTestMetadata({
      epic: 'API Automation',
      feature: 'User Management',
      story: 'Create User',
      severity: 'normal',
      tags: ['api', 'smoke'],
    });

    const payload = createUser({
      name: 'Bayas Tsyzhipov',
      username: 'bayas',
    });

    const createdUser = await test.step(
      'Submit user creation request',
      async () => userApi.createUser(payload),
    );

    await test.step('Validate created user', async () => {
      expect(createdUser.id).toBeGreaterThan(0);
      expect(createdUser.name).toBe(payload.name);
      expect(createdUser.username).toBe(payload.username);
      expect(createdUser.email).toBe(payload.email);
    });
  });
});