import type { Metadata } from 'next';

import History from '@/components/History/History';

import { NO_INDEX_PAGE } from '@/constants/seo.constants';

export const metadata: Metadata = {
  title: 'History',
  ...NO_INDEX_PAGE,
};

export default function HistoryPage() {
  return (
    <section>
      <h1 className='maintext maintext_green'>History</h1>
      <History />
    </section>
  );
}
