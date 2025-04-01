import type { Metadata } from 'next';

import { NO_INDEX_PAGE } from '@/constants/seo.constants';

export const metadata: Metadata = {
  title: 'Variables',
  ...NO_INDEX_PAGE,
};

export default function VariablesPage() {
  return (
    <div>
      <h2>Variables Page</h2>
    </div>
  );
}
