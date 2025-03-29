'use client';

import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

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
    }
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    redirect(LOGIN_PATH);
  };

  // const handleDeleteAccount = async () => {
  //   if (!user) return;

  //   try {
  //     const response = await fetch('/api/delete-user', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ userId: user.id }),
  //     });

  //     if (!response.ok) {
  //       const errorData = await response.json();
  //       console.error('Error deleting user:', errorData);
  //       alert('Ошибка: ' + errorData.error || 'Failed to delete user');
  //       return;
  //     }

  //     alert('Аккаунт удалён');
  //     redirect(LOGIN_PATH);
  //   } catch (error) {
  //     console.error('Unexpected error:', error);
  //     alert('Произошла непредвиденная ошибка');
  //   }
  // };

  return (
    <div>
      <h1>Личный кабинет</h1>
      {user ? (
        <div>
          <p>Email: {user.email}</p>
          <button onClick={handleLogout}>Выйти</button>
          {/* <button onClick={handleDeleteAccount}>Удалить аккаунт</button> */}
        </div>
      ) : (
        <p>Загрузка...</p>
      )}
    </div>
  );
}
