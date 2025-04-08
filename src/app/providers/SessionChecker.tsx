'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { SIGNIN_PATH } from '@/config/pages-url.config';

import { createClient } from '@/utils/supabase/client';

// import { createClient as createClientServer } from '@/utils/supabase/server';

const SessionChecker = () => {
  const router = useRouter();
  const supabase = createClient();
  // const supabaseServer = createClientServer();

  useEffect(() => {
    const checkSession = () => {
      const expiresAt = Number(localStorage.getItem('session_expires_at'));
      const now = Math.floor(Date.now() / 1000);

      if (expiresAt && now >= expiresAt) {
        localStorage.removeItem('session_expires_at');
        supabase.auth.signOut();
        // supabaseServer.auth.signOut();
        setTimeout(() => {
          router.push(SIGNIN_PATH); // или твой путь на авторизацию
        }, 3000);
      }
    };

    const interval = setInterval(checkSession, 5000); // каждые 5 сек
    return () => clearInterval(interval);
  }, [router]);

  return null; // это просто логика, UI не нужен
};

export default SessionChecker;
