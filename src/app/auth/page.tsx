import { Metadata } from 'next';

import { NO_INDEX_PAGE } from '@/constants/seo.constants';

import { signIn, signUp } from '../../utils/supabase/actions';

import Auth from './Auth';

export const metadata: Metadata = {
  title: 'Auth',
  ...NO_INDEX_PAGE,
};

const AuthPage = () => {
  return (
    <Auth
      signInAction={signIn}
      signUpAction={signUp}
    />
  );
};
export default AuthPage;
