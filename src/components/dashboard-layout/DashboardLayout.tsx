import React, { PropsWithChildren } from 'react';

import styles from '@/app/page.module.css';

const DashboardLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className={styles.mainContent}>{children}</div>;
};

export default DashboardLayout;
