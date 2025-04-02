'use client';

import { useRouter } from 'next/navigation';
// import { useEffect } from 'react';
import { toast } from 'sonner';

import { AUTH_PATH } from '@/config/pages-url.config';

import { useUser } from '@/hooks/useUser';

export default function Dashboard() {
  const { user, signOut } = useUser();
  const router = useRouter();

  // useEffect(() => {
  //   if (!user && !isLoading) {
  //     router.push(AUTH_PATH);
  //   }
  // }, [user, isLoading, router]);

  const handleLogout = async () => {
    await signOut();
    // console.log('logout');
    // debugger;
    toast.success('Вы вышли из аккаунта');
    // setTimeout(() => {
    // router.push(AUTH_PATH);
    // }, 1500);
    router.push(AUTH_PATH);
  };

  // if (isLoading) {
  //   return <p>Loading...</p>;
  // }

  return (
    <div>
      <h1>Личный кабинет</h1>
      <div>
        {user?.email && <p>Email: {user.email}</p>}
        {user?.identities && user.identities[0]?.identity_data?.first_name && (
          <p>Имя: {user.identities[0].identity_data.first_name}</p>
        )}
        <button onClick={handleLogout}>Выйти</button>
      </div>
    </div>
  );
}
