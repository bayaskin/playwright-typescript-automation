import { test, expect } from '../../src/fixtures/test.fixture';
import { createUser } from '../../src/utils/user.factory';

test.describe('Users API', () => {
  test('should retrieve a user by ID', async ({ userApi }) => {
    const user = await userApi.getUser(1);

    expect(user.id).toBe(1);
    expect(user.name).toBeTruthy();
    expect(user.email).toContain('@');
  });

  test('should create a user', async ({ userApi }) => {
    const payload = createUser({
      name: 'Bayas Tsyzhipov',
      username: 'bayas',
    });

    const createdUser = await userApi.createUser(payload);

    expect(createdUser.id).toBeGreaterThan(0);
    expect(createdUser.name).toBe(payload.name);
    expect(createdUser.username).toBe(payload.username);
    expect(createdUser.email).toBe(payload.email);
  });
});
