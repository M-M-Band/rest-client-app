import type { Metadata } from 'next';

import { NO_INDEX_PAGE } from '@/constants/seo.constants';

export const metadata: Metadata = {
  title: 'History',
  ...NO_INDEX_PAGE,
};

export default function HistoryPage() {
  return (
    <div>
      <h2>History Page</h2>
    </div>
  );
}
