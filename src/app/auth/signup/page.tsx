'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import Form from '@/components/Form/Form';

import { SignInFormData, SignUpFormData } from '@/types/auth.types';

import { DASHBOARD_PAGES } from '@/config/pages-url.config';

import { createClient } from '@/utils/supabase/client';

const SignUpPage = () => {
  const supabase = createClient();
  const router = useRouter();
  const mode = 'signup';

  const handleSubmit = async (formData: SignUpFormData | SignInFormData) => {
    const { email, password, name } = formData as SignUpFormData;
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
      toast.error(error.message);
    } else {
      toast.success('Проверьте свою почту!');
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

export default SignUpPage;
