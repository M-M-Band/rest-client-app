'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import styles from './history.module.css';

const { history__container, history__item } = styles;

type HistoryType = {
  method: string;
  url: string;
  fullUrl: string;
};

const parseHistoryItem = (item: string): HistoryType | null => {
  const parts = item.split('/rest/');
  if (parts.length < 2) return null;

  const [method, encodedUrlWithParams] = parts[1].split('/');
  const urlWithParams = atob(encodedUrlWithParams.split('?')[0]);
  return { method, url: urlWithParams, fullUrl: item };
};

const History = () => {
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('historyUrls') || '[]');
    setHistory(stored);
  }, []);

  return (
    <div className={history__container}>
      {history.length > 0 ? (
        history
          .slice()
          .reverse()
          .map((item, index) => {
            const parsed = parseHistoryItem(item);
            if (!parsed) return null;

            return (
              <Link
                key={index}
                href={parsed.fullUrl}
                className=''
              >
                <div className={history__item}>
                  <div className=''>Method: {parsed.method}</div>
                  <div className=''>URL: {parsed.url}</div>
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
