import {
  AuthError,
  AuthResponse,
  Session,
  SignInWithPasswordCredentials,
  SupabaseClient,
  User as SupabaseUser,
} from '@supabase/supabase-js';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { SIGNIN_PATH } from '@/config/pages-url.config';

import { createClient } from '@/utils/supabase/client';

import { server } from '@/__tests__/mocks/server';
import SignUpPage from '@/app/[locale]/auth/signup/page';

vi.mock('@/utils/supabase/client');

const mockedUseRouter = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => mockedUseRouter(),
}));

interface MockSupabaseClient {
  auth: {
    signUp: (
      params: Omit<SignInWithPasswordCredentials, 'options'> & {
        email: string;
        password: string;
      }
    ) => Promise<AuthResponse>;
    getSession: () => Promise<{
      data: { session: Session | null };
      error: AuthError | null;
    }>;
    getUser: () => Promise<{
      data: { user: SupabaseUser | null };
      error: AuthError | null;
    }>;
    signOut: () => Promise<{ error: AuthError | null }>;
  };
}

describe('SignUpForm', () => {
  beforeEach(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
    server.close();
    vi.clearAllMocks();
    mockedUseRouter.mockReset();
    vi.unstubAllEnvs();
  });

  it('should successfully sign up', async () => {
    const routerMock: AppRouterInstance = {
      push: vi.fn(),
      replace: vi.fn(),
      prefetch: vi.fn(),
      refresh: vi.fn(),
      back: vi.fn(),
      forward: vi.fn(),
    };
    mockedUseRouter.mockReturnValue(routerMock);

    const mockSupabase: MockSupabaseClient = {
      auth: {
        signUp: vi.fn().mockResolvedValue({
          data: { session: { access_token: 'token' } },
          error: null,
        }),
        getSession: vi.fn().mockResolvedValue({
          data: { session: { access_token: 'token' } },
          error: null,
        }),
        getUser: vi.fn().mockResolvedValue({
          data: { user: { email: 'test@example.com' } },
          error: null,
        }),
        signOut: vi.fn().mockResolvedValue({ error: null }),
      },
    };

    const mockedCreateClient = vi.mocked(createClient);
    mockedCreateClient.mockReturnValue(mockSupabase as SupabaseClient);

    vi.stubEnv('NEXT_PUBLIC_SUPABASE_URL', 'http://localhost:54321');
    vi.stubEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY', 'test_anon_key');
    const locale = 'en';
    render(
      <MemoryRouterProvider>
        <NextIntlClientProvider locale={locale}>
          <SignUpPage />
        </NextIntlClientProvider>
      </MemoryRouterProvider>
    );

    fireEvent.change(screen.getByPlaceholderText('Enter your name'), {
      target: { value: 'test' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter your email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Choose a password'), {
      target: { value: 'Qwe!23qwe' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password again'), {
      target: { value: 'Qwe!23qwe' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Main.signUp' }));

    await new Promise((resolve) => setTimeout(resolve, 500));
    await waitFor(() => {
      expect(routerMock.push).toHaveBeenCalledWith(SIGNIN_PATH);
    });
    expect(mockSupabase.auth.signUp).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'Qwe!23qwe',
      options: {
        data: {
          first_name: 'test',
        },
        emailRedirectTo: 'http://localhost:3000/en/dashboard',
      },
    });
    expect(mockedCreateClient).toHaveBeenCalled();
  });

  it('should display error message on sign up failure', async () => {
    const mockSupabase: MockSupabaseClient = {
      auth: {
        signUp: vi.fn().mockResolvedValue({
          data: null,
          error: { message: 'invalid credentials' },
        }),
        getSession: vi.fn().mockResolvedValue({
          data: { session: { access_token: 'token' } },
          error: null,
        }),
        getUser: vi.fn().mockResolvedValue({
          data: { user: { email: 'test@example.com' } },
          error: null,
        }),
        signOut: vi.fn().mockResolvedValue({ error: null }),
      },
    };
    const mockedCreateClient = vi.mocked(createClient);
    mockedCreateClient.mockReturnValue(mockSupabase as SupabaseClient);

    const routerMock: AppRouterInstance = {
      push: vi.fn(),
      replace: vi.fn(),
      prefetch: vi.fn(),
      refresh: vi.fn(),
      back: vi.fn(),
      forward: vi.fn(),
    };
    mockedUseRouter.mockReturnValue(routerMock);

    vi.stubEnv('NEXT_PUBLIC_SUPABASE_URL', 'http://localhost:54321');
    vi.stubEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY', 'test_anon_key');

    const locale = 'en';

    render(
      <MemoryRouterProvider>
        <NextIntlClientProvider locale={locale}>
          <SignUpPage />
        </NextIntlClientProvider>
      </MemoryRouterProvider>
    );

    fireEvent.change(screen.getByPlaceholderText('Enter your name'), {
      target: { value: 'test' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter your email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Choose a password'), {
      target: { value: 'Qwe!23qwe' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password again'), {
      target: { value: 'Qwe!23qwe' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Main.signUp' }));

    await waitFor(() => {
      expect(screen.getByTestId('error-message')).toBeInTheDocument();
      expect(screen.getByText('invalid credentials')).toBeInTheDocument();
    });
  });
});
