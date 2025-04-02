import type { Metadata } from 'next';

import { NO_INDEX_PAGE } from '@/constants/seo.constants';

import Rest from './Rest';

export const metadata: Metadata = {
  title: 'Rest',
  ...NO_INDEX_PAGE,
};

export default function RestPage() {
  return <Rest />;
}
