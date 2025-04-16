'use client';

import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import Form from '@/components/Form/Form';

import { SignInFormData, SignUpFormData } from '@/types/auth.types';

import { DASHBOARD_PAGES } from '@/config/pages-url.config';

import { createClient } from '@/utils/supabase/client';

import { getURL } from '../../../../utils/helpers';

const SignUpPage = () => {
  const supabase = createClient();
  const router = useRouter();
  const mode = 'signup';
  const locale = useLocale();

  const handleSubmit = async (formData: SignUpFormData | SignInFormData) => {
    const { email, password, name } = formData as SignUpFormData;
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${getURL()}/${locale}/dashboard`,
        data: {
          first_name: name,
        },
      },
    });
    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Please, check your email!');
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

export default SignUpPage;
