'use client';

import { Suspense, lazy, useEffect, useState } from 'react';

import Spinner from '../Spinner/Spinner';

const LazyRest = lazy(() => import('@/components/Rest/Rest'));

interface RestWrapperProps {
  slugs: string[];
}

const RestWrapper = ({ slugs }: RestWrapperProps) => {
  const [decodedSlugs, setDecodedSlugs] = useState<string[]>([]);

  useEffect(() => {
    if (slugs) {
      const [method, url, body] = slugs;
      const decodedMethod = method || '';
      const decodedUrl = url ? Buffer.from(url, 'base64').toString('utf8') : '';
      const decodedBody = body
        ? Buffer.from(body, 'base64').toString('utf8')
        : '';
      setDecodedSlugs([decodedMethod, decodedUrl, decodedBody]);
    }
  }, [slugs]);

  return (
    <Suspense fallback={<Spinner />}>
      <LazyRest slugs={decodedSlugs} />
    </Suspense>
  );
};

export default RestWrapper;
