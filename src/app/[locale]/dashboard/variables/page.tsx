import type { Metadata } from 'next';

import { Variables } from '@/components/Variables/Variables';

import { NO_INDEX_PAGE } from '@/constants/seo.constants';

export const metadata: Metadata = {
  title: 'Variables',
  ...NO_INDEX_PAGE,
};

export default function VariablesPage() {
  return (
    <section>
      <h1 className='maintext maintext_green'>Variables</h1>
      <Variables />
    </section>
  );
}
