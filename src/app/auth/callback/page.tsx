'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { supabase } from '@/lib/supabase';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    async function checkAuth() {
      const { data, error } = await supabase.auth.getUser();
      if (data?.user) {
        router.push('/dashboard'); // Перенаправляем в личный кабинет
      } else {
        router.push('/login'); // Если что-то пошло не так
      }
    }
    checkAuth();
  }, [router]);

  return <p>Проверка аутентификации...</p>;
}
