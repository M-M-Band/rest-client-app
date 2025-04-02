'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { SignInFormData } from '@/types/auth.types';

import { DASHBOARD_PAGES } from '@/config/pages-url.config';

import { createClient } from '@/utils/supabase/client';
import { SignInSchema } from '@/utils/validators';

import Auth from '../Auth';

const SignInPage = () => {
  const supabase = createClient();
  const router = useRouter();

  const handleSubmit = async (formData: SignInFormData) => {
    const result = SignInSchema.safeParse(formData);
    if (!result.success) {
      toast.error(result.error.message);
      return;
    }
    const { email, password } = result.data;
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Вы успешно авторизовались!');
      router.push(DASHBOARD_PAGES.ROOT);
    }
  };

  return (
    <Auth
      mode='signin'
      onSubmit={handleSubmit}
    />
  );
};

export default SignInPage;
