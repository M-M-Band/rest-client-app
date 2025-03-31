import type { Metadata } from 'next';

import LoginForm from '@/components/LoginForm';

import { NO_INDEX_PAGE } from '@/constants/seo.constants';

import { login, signup } from './actions';

// import styles from '@/app/page.module.css';

export const metadata: Metadata = {
  title: 'Login Page',
  ...NO_INDEX_PAGE,
};

export default function LoginPage() {
  return (
    <div>
      <LoginForm
        loginAction={login}
        signupAction={signup}
      />
    </div>
  );
}
