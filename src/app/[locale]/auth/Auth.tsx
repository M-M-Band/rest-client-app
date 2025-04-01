'use client';

import { useRouter } from 'next/navigation';
import React, { FC, useState } from 'react';
import { toast } from 'sonner';

import Form from '@/components/Form/Form';

import { AuthMode, SignInFormData, SignUpFormData } from '@/types/auth.types';

import { DASHBOARD_PAGES } from '@/config/pages-url.config';

import { createClient } from '@/utils/supabase/client';
import { SignInSchema, SignUpSchema } from '@/utils/validators';

const Auth: FC = () => {
  const [mode, setMode] = useState<AuthMode>('signup');
  //eslint-disable-next-line
  const [error, setError] = useState<string | null>(null);

  const isSignUpMode = mode === 'signup';

  const supabase = createClient();
  const router = useRouter();

  const handleSubmit = async (formData: SignUpFormData | SignInFormData) => {
    if (isSignUpMode) {
      const result = SignUpSchema.safeParse(formData);
      if (!result.success) {
        setError(result.error.message);
        return;
      }
      const { email, password, name } = result.data;
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: name,
          },
        },
      });
      if (error) {
        setError(error.message);
        toast.error(error.message);
      } else {
        toast.success('Проверьте свою почту!');

        router.push(DASHBOARD_PAGES.ROOT);
      }
    } else {
      const result = SignInSchema.safeParse(formData);
      if (!result.success) {
        setError(result.error.message);
        return;
      }
      const { email, password } = result.data;
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setError(error.message);
        toast.error(error.message);
      } else {
        toast.success('Вы успешно авторизовались!');
        router.push(DASHBOARD_PAGES.ROOT);
      }
    }
  };
  return (
    <Form
      mode={mode}
      onSubmit={handleSubmit}
      setMode={setMode}
      isSignUpMode={isSignUpMode}
    />
  );
};

export default Auth;
