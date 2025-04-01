import type { Metadata } from 'next';

import { NO_INDEX_PAGE } from '@/constants/seo.constants';

export const metadata: Metadata = {
  title: 'About',
  ...NO_INDEX_PAGE,
};

export default function AboutPage() {
  return (
    <div>
      <h2>About Page</h2>
    </div>
  );
}
