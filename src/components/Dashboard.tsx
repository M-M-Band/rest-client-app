'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { User } from '@/types/auth.types';

import { AUTH_PATH } from '@/config/pages-url.config';

import { supabase } from '@/lib/supabase';

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchUser() {
      const { data } = await supabase.auth.getUser();
      setUser(data?.user as User);
    }
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push(AUTH_PATH);
  };

  const handleDeleteAccount = async () => {
    if (!user) return;

    const { error } = await supabase.auth.admin.deleteUser(user.id);
    if (error) {
      alert('Ошибка: ' + error.message);
    } else {
      alert('Аккаунт удалён');
      router.push(AUTH_PATH);
    }
  };

  return (
    <div>
      <h1>Личный кабинет</h1>
      {user ? (
        <div>
          <p>Email: {user.email}</p>
          <button onClick={handleLogout}>Выйти</button>
          <button onClick={handleDeleteAccount}>Удалить аккаунт</button>
        </div>
      ) : (
        <p>Загрузка...</p>
      )}
    </div>
  );
}
