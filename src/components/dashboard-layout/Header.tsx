import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { DASHBOARD_PAGES, LOGIN_PATH } from '@/config/pages-url.config';

import logo from '../../../public/logo.svg';
import styles from '../../app/page.module.css';

const Header = () => {
  return (
    <header className='container'>
      <Link
        href={DASHBOARD_PAGES.ROOT}
        className={styles.buttons_container}
        style={{ textDecoration: 'none' }}
      >
        <Image
          priority={true}
          width={30}
          height={30}
          src={logo}
          alt='logo'
        />
        <p className={styles.logo}>Rest Client</p>
      </Link>
      <div className={styles.buttons_container}>
        <Link
          href={DASHBOARD_PAGES.HOME}
          className={styles.button}
        >
          Home
        </Link>
        <Link
          href={DASHBOARD_PAGES.REST}
          className={styles.button}
        >
          REST
        </Link>
        <Link
          href={DASHBOARD_PAGES.ABOUT}
          className={styles.button}
        >
          About
        </Link>
      </div>
      <div className={styles.buttons_container}>
        <select className={styles.select}>
          <option value='En'>En</option>
          <option value='Ru'>Ru</option>
        </select>

        <Link
          href={LOGIN_PATH}
          className={styles.button}
        >
          Sign in
        </Link>
      </div>
    </header>
  );
};

export default Header;
