import { describe, it, expect } from '@jest/globals';
import router from '../../../../src/api/user/user.route';

describe('User routes', () => {
  const routes = [{ path: '/verify', method: 'get' }];

  it.each(routes)('`$method` exists on $path', (route) => {
    expect(
      router.stack.some((s) =>
        Object.keys(s.route.methods).includes(route.method)
      )
    ).toBe(true);
    expect(router.stack.some((s) => s.route.path === route.path)).toBe(true);
  });
});
