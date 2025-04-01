'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import { AUTH_PATH, DASHBOARD_PAGES } from '@/config/pages-url.config';

import logo from '../../public/logo.svg';

const Header = () => {
  const pathname = usePathname();
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
        <select>
          <option value='En'>En</option>
          <option value='Ru'>Ru</option>
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
