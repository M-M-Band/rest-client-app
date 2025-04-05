import {
  // fireEvent,
  render,
  screen,
  // waitFor,
} from '@testing-library/react';
// import { rest } from 'msw';
import { useTranslations } from 'next-intl';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
// import { useRouter } from 'next/navigation';
// import { useForm } from 'react-hook-form';
import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from 'vitest';

import Form from '@/components/Form/Form';

// import styles from '@/components/Form/Form.module.css';

import { SignInFormData, SignUpFormData } from '@/types/auth.types';

// import { SignInSchema, SignUpSchema } from '@/utils/validators';

import { server } from '../mocks/server';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}));

vi.mock('next-intl', () => ({
  useTranslations: vi.fn((namespace) => {
    return (key: string) => {
      if (namespace === 'Main') {
        return key;
      }
      return `${namespace}.${key}`;
    };
  }),
}));

const onSubmitMock = vi.fn();
const mockedUseTranslations = vi.mocked(useTranslations);
// const mockedUseRouter = vi.mocked(useRouter);

describe('Form component', () => {
  beforeAll(() => server.listen());
  afterEach(() => {
    server.resetHandlers();
    onSubmitMock.mockClear();
    mockedUseTranslations.mockClear();
  });
  afterAll(() => server.close());

  const RenderForm = ({
    mode,
    onSubmit,
  }: {
    mode: 'signin' | 'signup';
    onSubmit: (data: SignUpFormData | SignInFormData) => Promise<void>;
  }) => {
    // const t = useTranslations('Main');
    return (
      <Form
        mode={mode}
        onSubmit={onSubmit}
      />
    );
  };
  const renderForm = (mode: 'signin' | 'signup') => {
    return render(
      <MemoryRouterProvider>
        <RenderForm
          mode={mode}
          onSubmit={onSubmitMock}
        />
      </MemoryRouterProvider>
    );
  };

  it('should render signin form correctly', () => {
    const t = useTranslations('Main');
    renderForm('signin');
    expect(mockedUseTranslations).toHaveBeenCalledWith('Main');
    expect(screen.getByTestId('form-title')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(t('Enter your email address'))
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(t('Enter your password'))
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: t('signIn') })
    ).toBeInTheDocument();
  });

  // it('should render signin form correctly', () => {
  //   renderForm('signin');
  //   expect(mockedUseTranslations).toHaveBeenCalledWith('Main');
  //   expect(screen.getByText('signIn')).toBeInTheDocument();
  //   expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
  //   expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
  //   expect(screen.getByRole('button', { name: 'signIn' })).toBeInTheDocument();
  // });

  // it('should render signup form correctly', () => {
  //   renderForm('signup');
  //   expect(mockedUseTranslations).toHaveBeenCalledWith('Main');
  //   expect(screen.getByText('signUp')).toBeInTheDocument();
  //   expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
  //   expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
  //   expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
  //   expect(screen.getByRole('button', { name: 'signUp' })).toBeInTheDocument();
  // });

  // it('should display validation errors', async () => {
  //   renderForm('signin');
  //   fireEvent.click(screen.getByRole('button', { name: 'signIn' }));

  //   await waitFor(() => {
  //     expect(screen.getByText('Email is required')).toBeInTheDocument();
  //     expect(screen.getByText('Password is required')).toBeInTheDocument();
  //   });
  // });

  // it('should call onSubmit with correct data for signin', async () => {
  //   renderForm('signin');
  //   fireEvent.change(screen.getByPlaceholderText('Email'), {
  //     target: { value: 'test@example.com' },
  //   });
  //   fireEvent.change(screen.getByPlaceholderText('Password'), {
  //     target: { value: 'password123' },
  //   });
  //   fireEvent.click(screen.getByRole('button', { name: 'signIn' }));

  //   await waitFor(() => {
  //     expect(onSubmitMock).toHaveBeenCalledWith({
  //       email: 'test@example.com',
  //       password: 'password123',
  //     });
  //   });
  // });

  // it('should call onSubmit with correct data for signup', async () => {
  //   renderForm('signup');
  //   fireEvent.change(screen.getByPlaceholderText('Email'), {
  //     target: { value: 'test@example.com' },
  //   });
  //   fireEvent.change(screen.getByPlaceholderText('Password'), {
  //     target: { value: 'password123' },
  //   });
  //   fireEvent.change(screen.getByPlaceholderText('Name'), {
  //     target: { value: 'test' },
  //   });
  //   fireEvent.click(screen.getByRole('button', { name: 'signUp' }));

  //   await waitFor(() => {
  //     expect(onSubmitMock).toHaveBeenCalledWith({
  //       email: 'test@example.com',
  //       password: 'password123',
  //       name: 'test',
  //     });
  //   });
  // });

  // it('should switch to signup form when "signUp" button clicked on signin form', async () => {
  //   const { push } = vi.fn();
  //   const routerMock = {
  //     push,
  //   };
  //   mockedUseRouter.mockImplementation(() => routerMock);
  //   renderForm('signin');
  //   fireEvent.click(screen.getByRole('button', { name: 'signUp' }));
  //   await waitFor(() => {
  //     expect(routerMock.push).toHaveBeenCalledWith('/auth/signup');
  //   });
  // });

  // it('should switch to signin form when "signIn" button clicked on signup form', async () => {
  //   const { push } = vi.fn();
  //   const routerMock = {
  //     push,
  //   };
  //   mockedUseRouter.mockImplementation(() => routerMock);
  //   renderForm('signup');
  //   fireEvent.click(screen.getByRole('button', { name: 'signIn' }));
  //   await waitFor(() => {
  //     expect(routerMock.push).toHaveBeenCalledWith('/auth/signin');
  //   });
  // });
});
