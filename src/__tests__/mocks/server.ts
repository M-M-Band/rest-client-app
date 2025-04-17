import { HttpResponse, http } from 'msw';
import { setupServer } from 'msw/node';

export const server = setupServer(
  http.post('http://localhost:54321/auth/v1/token?grant_type=password', () => {
    return HttpResponse.json({
      access_token: 'mocked_access_token',
      refresh_token: 'mocked_refresh_token',
      expires_in: 3600,
      token_type: 'bearer',
      user: {
        id: 'user_id',
        email: 'test@example.com',
        user_metadata: {},
        aud: 'authenticated',
      },
    });
  }),
  http.post('http://localhost:54321/auth/v1/signup', () => {
    return HttpResponse.json({
      email: 'test@example.com',
      user_metadata: {},
      id: 'user_id',
    });
  })
);
