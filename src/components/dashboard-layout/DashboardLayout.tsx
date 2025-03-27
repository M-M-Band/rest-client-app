import React, { PropsWithChildren } from 'react';

import Footer from './Footer';
import Header from './Header';

const DashboardLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default DashboardLayout;
