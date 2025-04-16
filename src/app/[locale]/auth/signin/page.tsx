// src/app/[locale]/auth/signin/page.tsx
'use client';

// Import useState
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

import Form from '@/components/Form/Form';

import { SignInFormData, SignUpFormData } from '@/types/auth.types';

import { DASHBOARD_PAGES } from '@/config/pages-url.config';

import { createClient } from '@/utils/supabase/client';

// src/app/[locale]/auth/signin/page.tsx

// src/app/[locale]/auth/signin/page.tsx

// src/app/[locale]/auth/signin/page.tsx

// src/app/[locale]/auth/signin/page.tsx

// src/app/[locale]/auth/signin/page.tsx

const SignInPage = () => {
  const supabase = createClient();
  const router = useRouter();
  const mode = 'signin';
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  ); // Add state for errorMessage

  const handleSubmit = async (formData: SignInFormData | SignUpFormData) => {
    setErrorMessage(undefined); // Clear previous error messages
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
      setErrorMessage(error.message); // Set the error message in state
      toast.error('Invalid login credentials');
    } else {
      toast.success('Successfully signed in!');
      router.push(DASHBOARD_PAGES.HOME);
    }
  };

  return (
    <Form
      mode={mode}
      onSubmit={handleSubmit}
      errorMessage={errorMessage} // Pass the error message
    />
  );
};

export default SignInPage;
