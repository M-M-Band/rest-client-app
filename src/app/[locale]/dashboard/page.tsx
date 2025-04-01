import type { Metadata } from 'next';

import Dashboard from '@/components/Dashboard';

import { NO_INDEX_PAGE } from '@/constants/seo.constants';

export const metadata: Metadata = {
  title: 'Dashboard',
  ...NO_INDEX_PAGE,
};

export default function DashboardPage() {
  return (
    <>
      <h2>Main page</h2>
      <Dashboard />
    </>
  );
}
