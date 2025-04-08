import type { Metadata } from 'next';

// import { useRouter } from 'next/router';

import { NO_INDEX_PAGE } from '@/constants/seo.constants';

import Rest from '../../../../../components/Rest/Rest';

export const metadata: Metadata = {
  title: 'Rest',
  ...NO_INDEX_PAGE,
};

export default async function RestPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  return <Rest slugs={slug} />;
}
