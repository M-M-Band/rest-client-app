'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { DASHBOARD_PAGES } from '@/config/pages-url.config';

import { createClient } from '@/utils/supabase/client';

const SessionChecker = () => {
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const checkSession = () => {
      const expiresAt = Number(localStorage.getItem('session_expires_at'));
      const now = Math.floor(Date.now() / 1000);

      if (expiresAt && now >= expiresAt) {
        localStorage.removeItem('session_expires_at');
        supabase.auth.signOut();
        setTimeout(() => {
          router.push(DASHBOARD_PAGES.HOME);
        }, 3000);
      }
    };

    const interval = setInterval(checkSession, 5000);
    return () => clearInterval(interval);
  }, [router]);

  return null;
};

export default SessionChecker;
