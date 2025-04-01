'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { AUTH_PATH } from '@/config/pages-url.config';

import { useUser } from '@/hooks/useUser';

export default function Dashboard() {
  const { user, signOut, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user && !isLoading) {
      router.push(AUTH_PATH);
    }
  }, [user, isLoading, router]);

  const handleLogout = async () => {
    await signOut();
    router.push(AUTH_PATH);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

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
