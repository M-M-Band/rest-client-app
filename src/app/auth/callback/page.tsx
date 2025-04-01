'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { AUTH_PATH, DASHBOARD_PAGES } from '@/config/pages-url.config';

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
          router.push(AUTH_PATH);
        }
      } catch (error) {
        setError('Произошла неизвестная ошибка.');
        console.error('Unexpected error:', error);
      } finally {
        setIsLoading(false);
      }
    }
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  if (isLoading) {
    return <p>Проверка аутентификации...</p>;
  }

  if (error) {
    return <p>Ошибка: {error}</p>;
  }

  return null;
}
