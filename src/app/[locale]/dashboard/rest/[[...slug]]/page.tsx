import type { Metadata } from 'next';

import RestWrapper from '@/components/Rest/RestWrapper';

import { NO_INDEX_PAGE } from '@/constants/seo.constants';

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

  return (
    <div>
      <RestWrapper slugs={slug} />
    </div>
  );
}
