'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { SignInFormData, SignUpFormData } from '@/types/auth.types';

import { DASHBOARD_PAGES } from '@/config/pages-url.config';

import { createClient } from '@/utils/supabase/client';
import { SignUpSchema } from '@/utils/validators';

import Auth from '../Auth';

const SignUpPage = () => {
  const supabase = createClient();
  const router = useRouter();

  const handleSubmit = async (formData: SignUpFormData | SignInFormData) => {
    if ('name' in formData) {
      const result = SignUpSchema.safeParse(formData);
      if (!result.success) {
        toast.error(result.error.message);
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
        toast.error(error.message);
      } else {
        toast.success('Проверьте свою почту!');
        router.push(DASHBOARD_PAGES.ROOT);
      }
    }
  };

  return (
    <Auth
      mode='signup'
      onSubmit={handleSubmit}
    />
  );
};

export default SignUpPage;
