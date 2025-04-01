'use client';

import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

import { User } from '@/types/auth.types';

import { AUTH_PATH } from '@/config/pages-url.config';

import { createClient } from '@/utils/supabase/client';

export default function Dashboard() {
  const supabase = createClient();

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function fetchUser() {
      const { data } = await supabase.auth.getUser();
      setUser(data?.user as User);
    }

    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    redirect(AUTH_PATH);
  };

  return (
    <div>
      <h1>Личный кабинет</h1>
      {user ? (
        <div>
          <p>Email: {user.email}</p>
          {user.identities[0].identity_data.first_name && (
            <p>Имя: {user.identities[0].identity_data.first_name}</p>
          )}
          <button onClick={handleLogout}>Выйти</button>
        </div>
      ) : (
        <p>Загрузка...</p>
      )}
    </div>
  );
}
