import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';

import History from '@/components/History/History';

import { NO_INDEX_PAGE } from '@/constants/seo.constants';

export const metadata: Metadata = {
  title: 'History',
  ...NO_INDEX_PAGE,
};

export default function HistoryPage() {
  const t = useTranslations('history');
  return (
    <section>
      <h1 className='maintext maintext_green'>{t('history')}</h1>
      <History />
    </section>
  );
}
