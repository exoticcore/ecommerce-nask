import { describe, it, expect } from '@jest/globals';
import AuthRoute from '../../../../src/api/auth/auth.route';

describe('Auth routes', () => {
  const authRoute = new AuthRoute();
  const routes = [
    { path: '/active-email', method: 'post' },
    { path: '/verify/:token', method: 'get' },
    { path: '/token', method: 'get' },
    { path: '/session', method: 'get' },
    { path: '/set-password', method: 'post' },
    { path: '/login', method: 'post' },
  ];

  it.each(routes)('`$method` exists on $path', (route) => {
    expect(
      authRoute.router.stack.some((s) =>
        Object.keys(s.route.methods).includes(route.method)
      )
    ).toBe(true);
    expect(
      authRoute.router.stack.some((s) => s.route.path === route.path)
    ).toBe(true);
  });
});
