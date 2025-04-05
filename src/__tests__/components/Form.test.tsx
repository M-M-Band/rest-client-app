<<<<<<< HEAD
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
=======
import {
  // fireEvent,
  render,
  screen,
  // waitFor,
} from '@testing-library/react';
>>>>>>> c4842e0 (feat: add form component tests and update dependencies)
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

<<<<<<< HEAD
const push = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push,
=======
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
>>>>>>> c4842e0 (feat: add form component tests and update dependencies)
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
<<<<<<< HEAD
// const mockedUseRouter = vi.mocked(vi.importActual('next/navigation') as any);
=======
// const mockedUseRouter = vi.mocked(useRouter);
>>>>>>> c4842e0 (feat: add form component tests and update dependencies)

describe('Form component', () => {
  beforeAll(() => server.listen());
  afterEach(() => {
    server.resetHandlers();
    onSubmitMock.mockClear();
    mockedUseTranslations.mockClear();
<<<<<<< HEAD
    // mockedUseRouter.useRouter().push.mockClear();
    push.mockClear();
=======
>>>>>>> c4842e0 (feat: add form component tests and update dependencies)
  });
  afterAll(() => server.close());

  const RenderForm = ({
    mode,
    onSubmit,
  }: {
    mode: 'signin' | 'signup';
    onSubmit: (data: SignUpFormData | SignInFormData) => Promise<void>;
  }) => {
<<<<<<< HEAD
=======
    // const t = useTranslations('Main');
>>>>>>> c4842e0 (feat: add form component tests and update dependencies)
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
<<<<<<< HEAD
    expect(screen.getByTestId('submit-button')).toBeInTheDocument();
  });

  it('should render signup form correctly', () => {
    const t = useTranslations('Main');
    renderForm('signup');
    expect(mockedUseTranslations).toHaveBeenCalledWith('Main');
    expect(screen.getByTestId('form-title')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(t('Enter your name'))
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(t('Enter your email'))
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(t('Choose a password'))
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(t('Password again'))
    ).toBeInTheDocument();
    expect(screen.getByTestId('submit-button')).toBeInTheDocument();
  });

  it('should display validation errors for signin', async () => {
    const t = useTranslations('Main');
    renderForm('signin');
    fireEvent.click(screen.getByTestId('submit-button'));

    await waitFor(
      () => {
        expect(screen.getByText(t('Email is required'))).toBeInTheDocument();
        expect(screen.getByText(t('Password is required'))).toBeInTheDocument();
      },
      { timeout: 1000 }
    );
  });

  it('should display validation errors for signup', async () => {
    const t = useTranslations('Main');
    renderForm('signup');
    fireEvent.click(screen.getByTestId('submit-button'));

    await waitFor(
      () => {
        expect(screen.getByText(t('Name is required'))).toBeInTheDocument();
      },
      { timeout: 1000 }
    );
    await waitFor(
      () => {
        expect(screen.getByText(t('Email is required'))).toBeInTheDocument();
      },
      { timeout: 1000 }
    );
  });

  it('should display validation errors for signup', async () => {
    renderForm('signup');
    fireEvent.change(screen.getByPlaceholderText('Choose a password'), {
      target: { value: '123' }, // короткий пароль
    });

    fireEvent.change(screen.getByPlaceholderText('Password again'), {
      target: { value: '123' },
    });

    fireEvent.click(screen.getByTestId('submit-button'));

    await waitFor(() => {
      const error = screen.getAllByText(
        (_, el) =>
          el?.textContent === 'Password must contain at least 8 characters'
      );
      expect(error).toHaveLength(4);
    });
  });

  it('should call onSubmit with correct data for signin', async () => {
    renderForm('signin');
    fireEvent.change(screen.getByPlaceholderText('Enter your email address'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter your password'), {
      target: { value: 'Qwe!23qwe' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'signIn' }));

    await waitFor(() => {
      expect(onSubmitMock).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'Qwe!23qwe',
      });
    });
  });

  it('should call onSubmit with correct data for signup', async () => {
    renderForm('signup');
    fireEvent.change(screen.getByPlaceholderText('Enter your name'), {
      target: { value: 'Test' },
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
    fireEvent.click(screen.getByRole('button', { name: 'signUp' }));

    await waitFor(() => {
      expect(onSubmitMock).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'Qwe!23qwe',
        name: 'Test',
        confirmPassword: 'Qwe!23qwe',
      });
    });
  });

  it('should switch to signup form when "signUp" button clicked on signin form', async () => {
    renderForm('signin');
    const t = useTranslations('Main');
    fireEvent.click(screen.getByRole('button', { name: t('signUp') }));
    await waitFor(() => {
      expect(push).toHaveBeenCalledWith('/auth/signup');
    });
  });

  it('should switch to signin form when "signIn" button clicked on signup form', async () => {
    renderForm('signup');
    const t = useTranslations('Main');
    fireEvent.click(screen.getByRole('button', { name: t('signIn') }));
    await waitFor(() => {
      expect(push).toHaveBeenCalledWith('/auth/signin');
    });
  });

  it('should display email format error for signin', async () => {
    const t = useTranslations('Main');
    renderForm('signin');
    fireEvent.change(screen.getByPlaceholderText('Enter your email address'), {
      target: { value: 'test_example_com' },
    });
    fireEvent.click(screen.getByTestId('submit-button'));

    await waitFor(() => {
      expect(screen.getByText(t('Invalid email'))).toBeInTheDocument();
    });
  });

  it('should display password min length error for signin', async () => {
    const t = useTranslations('Main');
    renderForm('signin');
    fireEvent.focus(screen.getByPlaceholderText('Enter your email address'));
    fireEvent.focus(screen.getByPlaceholderText('Enter your password'));
    fireEvent.click(screen.getByTestId('submit-button'));

    await waitFor(() => {
      expect(screen.getByText(t('Email is required'))).toBeInTheDocument();
    });
  });

  it('should display email format error for signin', async () => {
    const t = useTranslations('Main');
    renderForm('signin');
    fireEvent.change(screen.getByPlaceholderText('Enter your email address'), {
      target: { value: 't.com' },
    });

    fireEvent.click(screen.getByTestId('submit-button'));

    await waitFor(() => {
      expect(screen.getByText(t('Invalid email'))).toBeInTheDocument();
    });
  });

  it('should display email format error for signup', async () => {
    const t = useTranslations('Main');
    renderForm('signup');
    fireEvent.change(screen.getByPlaceholderText('Enter your email'), {
      target: { value: 'test_example_com' },
    });
    fireEvent.click(screen.getByTestId('submit-button'));

    await waitFor(() => {
      expect(screen.getByText(t('Invalid email'))).toBeInTheDocument();
    });
  });

  it('should display password min length error for signup', async () => {
    // const t = useTranslations('Main');
    renderForm('signup');
    fireEvent.change(screen.getByPlaceholderText('Choose a password'), {
      target: { value: 'Qwe!23' },
    });
    fireEvent.click(screen.getByTestId('submit-button'));

    await waitFor(() => {
      const error = screen.getAllByText(
        (_, el) =>
          el?.textContent === 'Password must contain at least 8 characters'
      );
      expect(error).toHaveLength(4);
    });
  });

  it('should display password mismatch error', async () => {
    const t = useTranslations('Main');
    renderForm('signup');
    fireEvent.change(screen.getByPlaceholderText('Choose a password'), {
      target: { value: 'Qwe!23qwe' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password again'), {
      target: { value: 'Qwe!23qwe1' },
    });
    fireEvent.click(screen.getByTestId('submit-button'));

    await waitFor(() => {
      expect(screen.getByText(t(`Passwords don't match`))).toBeInTheDocument();
    });
  });
=======
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
>>>>>>> c4842e0 (feat: add form component tests and update dependencies)
});
