import type { Metadata } from 'next';

import { NO_INDEX_PAGE } from '@/constants/seo.constants';

export const metadata: Metadata = {
  title: 'Error Page',
  ...NO_INDEX_PAGE,
};

export default function ErrorPage() {
  return <p>Sorry, something went wrong</p>;
}
