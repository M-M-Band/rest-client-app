'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { supabase } from '@/lib/supabase';
import { User } from '@/types/auth.types';


export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchUser() {
      const { data } = await supabase.auth.getUser();
      console.log(data);
      setUser(data?.user as User);
    }
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/auth');
  };
  const handleDeleteAccount = async () => {
    console.log(user);
    if (!user) return;

    const { error } = await supabase.auth.admin.deleteUser(user.id);
    if (error) {
      alert('Ошибка: ' + error.message);
    } else {
      alert('Аккаунт удалён');
      router.push('/auth');
    }
  };

  return (
    <div className='p-8'>
      <h1 className='text-2xl font-bold mb-4'>Личный кабинет</h1>
      {user ? (
        <div>
          <p>Email: {user.email}</p>
          <button
            onClick={handleLogout}
            className='bg-red-500 text-white px-4 py-2 mt-4 rounded'
          >
            Выйти
          </button>
          <button
            onClick={handleDeleteAccount}
            className='bg-red-500 text-white px-4 py-2 mt-4 rounded'
          >
            Удалить аккаунт
          </button>
        </div>
      ) : (
        <p>Загрузка...</p>
      )}
    </div>
  );
}
