<<<<<<< HEAD:src/app/[locale]/auth/page.tsx
import { signIn, signUp } from '../../../utils/supabase/actions';

import Auth from './Auth';
=======
import { redirect } from 'next/navigation';
>>>>>>> 1ac03db (feat: Refactor authentication logic and update routing configuration):src/app/auth/page.tsx

const AuthPage = () => {
  redirect('/auth/signin');
};

export default AuthPage;
