'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { DASHBOARD_PAGES, LOGIN_PATH } from '@/config/pages-url.config';

import { supabase } from '@/lib/supabase';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    async function checkAuth() {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        router.push(DASHBOARD_PAGES.HOME); // Перенаправляем в личный кабинет
      } else {
        router.push(LOGIN_PATH); // Если что-то пошло не так
      }
    }
    checkAuth();
  }, [router]);

  return <p>Проверка аутентификации...</p>;
}
