'use client';

import { redirect } from 'next/navigation';

import { AUTH_PATH } from '@/config/pages-url.config';

import { useUser } from '@/hooks/useUser';

import { createClient } from '@/utils/supabase/client';

import styles from './dashboard.module.css';

const { dashboard } = styles;

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
    <section className={dashboard}>
      <h1 className='maintext'>
        Welcome,{' '}
        <span className='maintext_green'>
          {user.identities[0].identity_data.first_name}
        </span>
        !
      </h1>
      <p className='subtext'>
        We are glad to see you again. You now have access to all features of
        your account.
      </p>
      <button
        onClick={handleLogout}
        className='button button_colored'
      >
        Sign Out
      </button>
    </section>
  );
}
