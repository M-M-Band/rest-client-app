'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { DASHBOARD_PAGES } from '@/config/pages-url.config';

import { useUser } from '@/hooks/useUser';

const Dashboard = () => {
  const { user, signOut } = useUser();
  const locale = useLocale();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    toast.success('Successfully signed out!');
    router.push(`/${locale}${DASHBOARD_PAGES.ROOT}`);
  };

  const t = useTranslations('Main');

  return (
    <div>
      <h1>Личный кабинет</h1>
      <div>
        {user?.email && <p>Email: {user.email}</p>}
        {user?.identities && user.identities[0]?.identity_data?.first_name && (
          <p>Имя: {user.identities[0].identity_data.first_name}</p>
        )}
        <button onClick={handleLogout}>{t('signOut')}</button>
      </div>
    </div>
  );
};
export default Dashboard;
