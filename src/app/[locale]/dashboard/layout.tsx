import { FC, PropsWithChildren } from 'react';

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return <div data-field='123'>{children}</div>;
};

export default Layout;
