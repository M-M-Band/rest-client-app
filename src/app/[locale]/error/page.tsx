import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';

import { NO_INDEX_PAGE } from '@/constants/seo.constants';

export const metadata: Metadata = {
  title: 'Error Page',
  ...NO_INDEX_PAGE,
};

export default function ErrorPage() {
  const t = useTranslations('Main');
  return <p>{t('errorPageDescription')}</p>;
}
