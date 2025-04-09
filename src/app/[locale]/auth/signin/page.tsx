'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import Form from '@/components/Form/Form';

import { SignInFormData, SignUpFormData } from '@/types/auth.types';

import { DASHBOARD_PAGES } from '@/config/pages-url.config';

import { createClient } from '@/utils/supabase/client';

const SignInPage = () => {
  const supabase = createClient();
  const router = useRouter();
  const mode = 'signin';

  const handleSubmit = async (formData: SignInFormData | SignUpFormData) => {
    const { email, password } = formData;
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (data.session) {
      const expiresAt = data.session.expires_at;
      localStorage.setItem('session_expires_at', String(expiresAt));
    }
    if (error) {
      toast.error(error.message);
    } else {
      localStorage.setItem('authToken', data.session.access_token);
      toast.success('Successfully signed in!');
      router.push(DASHBOARD_PAGES.HOME);
    }
  };

  return (
    <Form
      mode={mode}
      onSubmit={handleSubmit}
    />
  );
};

export default SignInPage;
