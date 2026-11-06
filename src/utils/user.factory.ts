import type { CreateUserRequest } from '../api/types';

export function createUser(overrides: Partial<CreateUserRequest> = {}): CreateUserRequest {
  return {
    name: 'Test User',
    username: 'testuser',
    email: 'test@example.com',
    ...overrides,
  };
}
