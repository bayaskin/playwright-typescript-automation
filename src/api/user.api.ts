import type { APIRequestContext, APIResponse } from '@playwright/test';
import type { CreateUserRequest } from './types';
import { ApiRequestError } from './api-error';
import {
  userSchema,
  createUserResponseSchema,
} from '../schemas/user.schema';

export class UserApi {
  constructor(private readonly request: APIRequestContext) {}

  private async ensureSuccess(
    response: APIResponse,
    method: string,
  ): Promise<void> {
    if (response.ok()) {
      return;
    }

    const message = await response.text();

    throw new ApiRequestError(
      `API request failed: ${method} ${response.url()} ` +
        `returned ${response.status()}. Response: ${message}`,
      response.status(),
      method,
      response.url(),
    );
  }

  async getUser(id: number) {
    const response = await this.request.get(`/users/${id}`);

    await this.ensureSuccess(response, 'GET');

    const body: unknown = await response.json();

    return userSchema.parse(body);
  }

  async createUser(payload: CreateUserRequest) {
    const response = await this.request.post('/users', {
      data: payload,
    });

    await this.ensureSuccess(response, 'POST');

    const body: unknown = await response.json();

    return createUserResponseSchema.parse(body);
  }
}
