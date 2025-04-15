'use client';

import { Suspense, lazy } from 'react';

import Spinner from '../Spinner/Spinner';

// Ленивая загрузка компонента Variables
const LazyVariables = lazy(() => import('@/components/Variables/Variables'));

const VariablesWrapper = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <LazyVariables />
    </Suspense>
  );
};

export default VariablesWrapper;
