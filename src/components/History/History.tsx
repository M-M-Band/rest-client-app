'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import { HistoryItem } from '@/components/Rest/Rest';

import { HTTP_METHODS } from '@/types/rest.types';

import { HISTORY_KEY } from '@/utils/constants';

import styles from './history.module.css';

const { history__container, history__item, history__item_method } = styles;

const History = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const storedHistory: HistoryItem[] = JSON.parse(
      localStorage.getItem(HISTORY_KEY) || '[]'
    );
    setHistory(storedHistory);
  }, []);

  return (
    <div className={history__container}>
      {history.length > 0 ? (
        history
          .slice()
          .reverse()
          .map((item, index) => {
            const fullUrl = item.url;

            const headersParams = new URLSearchParams();
            item.headers.forEach((header) => {
              if (header.key && header.value) {
                headersParams.append(header.key, header.value);
              }
            });
            const methodColor =
              HTTP_METHODS.find((m) => m.value === item.method)?.color || '';

            return (
              <Link
                key={index}
                href={fullUrl}
                className=''
              >
                <div className={history__item}>
                  <div>Date: {item.date}</div>
                  <div>
                    Method:{' '}
                    <span
                      className={history__item_method}
                      style={{ color: methodColor }}
                    >
                      {item.method}
                    </span>
                  </div>
                  <div>URL: {atob(item.requestURL)}</div>
                </div>
              </Link>
            );
          })
      ) : (
        <h3>No history items</h3>
      )}
    </div>
  );
};

export default History;
