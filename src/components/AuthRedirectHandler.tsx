'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { DASHBOARD_PAGES } from '@/config/pages-url.config';

// Импортируйте из next/navigation
import { useUser } from '@/hooks/useUser';

const AuthRedirectHandler = () => {
  const router = useRouter();
  const pathname = usePathname(); // Получаем текущий путь
  const { user, loading } = useUser(); // Получаем пользователя и состояние загрузки

  useEffect(() => {
    // Проверяем, выполняется ли код на клиенте
    if (typeof window !== 'undefined') {
      const code = new URLSearchParams(window.location.search).get('code'); // Получаем параметр code из URL

      if (!code) return; // Если кода нет, ничего не делаем

      if (!loading && user) {
        // Если загрузка завершена и пользователь авторизован
        router.replace(DASHBOARD_PAGES.HOME);
      }
    }
  }, [loading, user, router, pathname]); // Добавьте pathname в зависимости, если нужно

  return null; // Не нужно рендерить ничего
};

export default AuthRedirectHandler;
