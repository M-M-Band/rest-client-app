'use client';

import { redirect } from 'next/navigation';

import { AUTH_PATH } from '@/config/pages-url.config';

import { useUser } from '@/hooks/useUser';

import { createClient } from '@/utils/supabase/client';

export default function Dashboard() {
  const { user, isLoading, error } = useUser();
  const supabase = createClient();
  const handleLogout = async () => {
    await supabase.auth.signOut();
    redirect(AUTH_PATH);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!user) {
    return <p>Not logged in</p>;
  }

  return (
    <div>
      <h1>Личный кабинет</h1>
      <div>
        <p>Email: {user.email}</p>

        <p>Имя: {user.identities[0].identity_data.first_name}</p>
        <button onClick={handleLogout}>Выйти</button>
      </div>
    </div>
  );
}
