import { User } from '@supabase/supabase-js';
import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
// import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import Header from '@/components/Header';

import { useUser } from '@/hooks/useUser';

import { usePathname } from '@/i18n/navigation';

vi.mock('@/hooks/useUser');
vi.mock('@/i18n/navigation', () => ({
  useRouter: vi.fn(),
  usePathname: vi.fn(),
}));

vi.mock('next-intl', async (importOriginal) => {
  const actual = (await importOriginal()) as typeof import('next-intl');
  return {
    ...actual,
    useTranslations: vi.fn((namespace) => {
      return (key: string) => {
        if (namespace === 'Main') {
          return key;
        }
        return `${namespace}.${key}`;
      };
    }),
    useLocale: vi.fn(() => 'en'),
    NextIntlClientProvider: ({ children }: { children: React.ReactNode }) => {
      return <>{children}</>;
    },
  };
});

describe('Header Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(usePathname).mockReturnValue('/');
  });

  it('should render correctly for logged-in user', () => {
    const mockUser: Partial<User> = {
      id: '123',
    };
    const mockedUseUser = vi.mocked(useUser);
    mockedUseUser.mockReturnValue({
      user: mockUser as User, // Мокируем залогиненного пользователя
      signOut: vi.fn(),
      loading: false,
    });

    render(
      <MemoryRouterProvider>
        <NextIntlClientProvider locale='en'>
          <Header />
        </NextIntlClientProvider>
      </MemoryRouterProvider>
    );

    // Проверяем наличие логотипа
    expect(screen.getByTestId('rest_client_logo')).toBeInTheDocument();

    // Проверяем наличие ссылок
    expect(screen.getByText('REST Client')).toBeInTheDocument();
    expect(screen.getByText('history')).toBeInTheDocument();
    expect(screen.getByText('variables')).toBeInTheDocument();

    // Проверяем наличие селектора языка
    expect(screen.getByRole('combobox')).toBeInTheDocument();

    // Проверяем наличие кнопки signOut
    expect(screen.getByRole('button', { name: 'signOut' })).toBeInTheDocument();
  });

  it('should render correctly for logged-out user', () => {
    const mockedUseUser = vi.mocked(useUser);
    mockedUseUser.mockReturnValue({
      user: null, // Мокируем незалогиненного пользователя
      signOut: vi.fn(),
      loading: false,
    });

    render(
      <MemoryRouterProvider>
        <NextIntlClientProvider locale='en'>
          <Header />
        </NextIntlClientProvider>
      </MemoryRouterProvider>
    );

    // Проверяем наличие логотипа
    expect(screen.getByText('Rest Client')).toBeInTheDocument();

    // Проверяем наличие ссылок signIn и signUp
    expect(screen.getByText('signIn')).toBeInTheDocument();
    expect(screen.getByText('signUp')).toBeInTheDocument();

    // Проверяем наличие селектора языка
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  // it('should call signOut and redirect on logout button click', async () => {
  //   const mockUser: Partial<User> = {
  //     id: '123',
  //   };
  //   const mockedUseUser = vi.mocked(useUser);
  //   const mockSignOut = vi.fn();
  //   mockedUseUser.mockReturnValue({
  //     user: mockUser as User,
  //     signOut: mockSignOut,
  //     loading: false,
  //   });
  //   const mockedUseRouter = vi.mocked(useRouter);
  //   const mockPush = vi.fn();
  //   mockedUseRouter.mockReturnValue({
  //     push: mockPush,
  //     replace: vi.fn(),
  //     refresh: vi.fn(),
  //     prefetch: vi.fn(),
  //   } as unknown as AppRouterInstance);

  //   render(
  //     <MemoryRouterProvider>
  //       <NextIntlClientProvider locale='en'>
  //         <Header />
  //       </NextIntlClientProvider>
  //     </MemoryRouterProvider>
  //   );

  //   const signOutButton = screen.getByRole('button', { name: 'signOut' });
  //   fireEvent.click(signOutButton);

  //   expect(mockSignOut).toHaveBeenCalled();
  //   expect(mockPush).toHaveBeenCalledWith('/');
  // });

  // it('should change locale when language is changed', () => {
  //   const mockedUseUser = vi.mocked(useUser);
  //   mockedUseUser.mockReturnValue({
  //     user: null,
  //     signOut: vi.fn(),
  //     loading: false,
  //   });
  //   const mockedUseRouter = vi.mocked(useRouter);
  //   const mockReplace = vi.fn();
  //   mockedUseRouter.mockReturnValue({
  //     push: vi.fn(),
  //     replace: mockReplace,
  //     refresh: vi.fn(),
  //     prefetch: vi.fn(),
  //   } as unknown as AppRouterInstance);

  //   render(
  //     <MemoryRouterProvider>
  //       <NextIntlClientProvider locale='en'>
  //         <Header />
  //       </NextIntlClientProvider>
  //     </MemoryRouterProvider>
  //   );

  //   const select = screen.getByRole('combobox');
  //   fireEvent.change(select, { target: { value: 'ru' } });

  //   expect(mockReplace).toHaveBeenCalledWith({ pathname: '/' }, { locale: 'ru' });
  // });

  // it('should change background color on scroll', () => {
  //   const mockedUseUser = vi.mocked(useUser);
  //   mockedUseUser.mockReturnValue({
  //     user: null,
  //     signOut: vi.fn(),
  //     loading: false,
  //   });

  //   render(
  //     <MemoryRouterProvider>
  //       <NextIntlClientProvider locale='en'>
  //         <Header />
  //       </NextIntlClientProvider>
  //     </MemoryRouterProvider>
  //   );

  //   const header = screen.getByRole('banner');

  //   // Проверяем начальный цвет фона
  //   expect(header).toHaveStyle('background-color: var(--bg-grey)');

  //   // Имитируем скролл
  //   fireEvent.scroll(window, { target: { scrollY: 30 } });

  //   // Проверяем, что цвет фона изменился
  //   expect(header).toHaveStyle('background-color: #272822');
  // });
});
