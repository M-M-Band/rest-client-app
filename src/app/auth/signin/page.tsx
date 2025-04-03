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
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Successfully signed in!');
      debugger;
      router.push(DASHBOARD_PAGES.ROOT);
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
