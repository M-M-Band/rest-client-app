import type { Metadata } from 'next';

import { NO_INDEX_PAGE } from '@/constants/seo.constants';

import { HTTP_METHODS } from '@/types/rest.types';

import styles from './rest.module.css';

const { rest, form } = styles;

export const metadata: Metadata = {
  title: 'Rest',
  ...NO_INDEX_PAGE,
};

export default function RestPage() {
  return (
    <section className={rest}>
      <h1 className='maintext maintext_green'>REST Client</h1>
      <form className={form}>
        <select
          id='http-methods'
          name='http-methods'
        >
          {HTTP_METHODS.map((method) => {
            return (
              <option
                key={method.value}
                value={method.value}
                style={{ color: method.color }}
              >
                {method.value}
              </option>
            );
          })}
        </select>
      </form>
    </section>
  );
}
