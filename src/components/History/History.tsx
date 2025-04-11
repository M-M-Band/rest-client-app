'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';

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
    <div className=''>
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
                <div className=''>Method:</div>
                <div className=''>{parsed.method}</div>
                <div className=''>{parsed.url}</div>
              </Link>
            );
          })
      ) : (
        <div>No history items</div>
      )}
    </div>
  );
};

export default History;
