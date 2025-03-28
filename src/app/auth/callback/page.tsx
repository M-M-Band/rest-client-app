'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { DASHBOARD_PAGES, LOGIN_PATH } from '@/config/pages-url.config';

import { createClient } from '@/utils/supabase/client';

export default function AuthCallback() {
  const supabase = createClient();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function checkAuth() {
      try {
        const { data, error } = await supabase.auth.getUser();
        if (error) {
          setError('Ошибка авторизации. Пожалуйста, попробуйте снова.');
          console.error('Error checking auth:', error);
        } else if (data?.user) {
          router.push(DASHBOARD_PAGES.HOME);
        } else {
          router.push(LOGIN_PATH);
        }
      } catch (error) {
        setError('Произошла неизвестная ошибка.');
        console.error('Unexpected error:', error);
      } finally {
        setIsLoading(false);
      }
    }
    checkAuth();
  }, [router]);

  if (isLoading) {
    return <p>Проверка аутентификации...</p>;
  }

  if (error) {
    return <p>Ошибка: {error}</p>;
  }

  return null; // Ничего не отображается после перенаправления
}
