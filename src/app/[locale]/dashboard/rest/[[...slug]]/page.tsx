import type { Metadata } from 'next';

import { NO_INDEX_PAGE } from '@/constants/seo.constants';

import RestWrapper from '../../../../../components/Rest/RestWrapper';

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
