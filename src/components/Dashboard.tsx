'use client';

import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

// import { toast } from 'sonner';

import { User } from '@/types/auth.types';

import { LOGIN_PATH } from '@/config/pages-url.config';

import { createClient } from '@/utils/supabase/client';

export default function Dashboard() {
  const supabase = createClient();

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function fetchUser() {
      const { data } = await supabase.auth.getUser();
      setUser(data?.user as User);
      console.log('user', data?.user);
    }

    fetchUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    // toast.success('Вы успешно вышли из системы!');
    redirect(LOGIN_PATH);
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
