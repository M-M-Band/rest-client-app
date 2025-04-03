import { signIn, signUp } from '../../../utils/supabase/actions';

import Auth from './Auth';

const AuthPage = () => {
  return (
    <Auth
      signInAction={signIn}
      signUpAction={signUp}
    />
  );
};
export default AuthPage;
