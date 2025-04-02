'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { AUTH_PATH } from '@/config/pages-url.config';

import { useUser } from '@/hooks/useUser';

const Dashboard = () => {
  const { user, signOut } = useUser();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    toast.success('Вы вышли из аккаунта');
    router.push(AUTH_PATH);
  };

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
};
export default Dashboard;
