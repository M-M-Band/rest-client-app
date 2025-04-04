import type { Metadata } from 'next';

import { NO_INDEX_PAGE } from '@/constants/seo.constants';

export const metadata: Metadata = {
  title: 'Rest',
  ...NO_INDEX_PAGE,
};

export default function RestPage() {
  return (
    <div>
      <h2>REST Page</h2>
    </div>
  );
}
