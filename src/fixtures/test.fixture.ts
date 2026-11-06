import { test as base, expect } from '@playwright/test';
import { UserApi } from '../api/user.api';
import { config } from '../utils/config';

type Fixtures = {
  userApi: UserApi;
};

export const test = base.extend<Fixtures>({
  userApi: async ({ playwright }, use) => {
    const request = await playwright.request.newContext({
      baseURL: config.apiBaseUrl,
      extraHTTPHeaders: {
        Accept: 'application/json',
      },
    });

    await use(new UserApi(request));

    await request.dispose();
  },
});

export { expect };
