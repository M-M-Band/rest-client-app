'use client';

import { useLocale } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import React, { ChangeEvent } from 'react';

import { AUTH_PATH, DASHBOARD_PAGES } from '@/config/pages-url.config';

import logo from '../../../public/logo.svg';

import { usePathname, useRouter } from '@/i18n/navigation';

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();

  const handleLangChange = (e: ChangeEvent<HTMLSelectElement>) => {
    router.replace({ pathname }, { locale: e.target.value });
  };

  return (
    <header>
      <Link
        href={`${DASHBOARD_PAGES.ROOT}`}
        className='buttons-container'
      >
        <Image
          priority={true}
          width={30}
          height={30}
          src={logo}
          alt='logo'
        />
        <span>Rest Client</span>
      </Link>
      <div className='buttons-container'>
        <Link
          href={`${DASHBOARD_PAGES.ROOT}`}
          className={`button ${pathname === `${DASHBOARD_PAGES.ROOT}` ? 'active' : ''}`}
        >
          Home
        </Link>
        <Link
          href={`${DASHBOARD_PAGES.ABOUT}`}
          className={`button ${pathname === `${DASHBOARD_PAGES.ABOUT}` ? 'active' : ''}`}
        >
          About
        </Link>
      </div>
      <div className='buttons-container'>
        <select
          onChange={handleLangChange}
          defaultValue={locale}
        >
          <option value='en'>En</option>
          <option value='ru'>Ru</option>
        </select>

        <Link
          href={`${AUTH_PATH}`}
          className={`button ${pathname === '/auth' ? 'active' : ''}`}
        >
          Sign In
        </Link>
        <Link
          href={`${AUTH_PATH}`}
          className={`button ${pathname === '/auth' ? 'active' : ''}`}
        >
          Sign Up
        </Link>
      </div>
    </header>
  );
};

export default Header;
