'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useRef } from 'react';

import { AUTH_PATH, DASHBOARD_PAGES } from '@/config/pages-url.config';

import { useUser } from '@/hooks/useUser';

import logo from '../../public/logo.svg';

const Header = () => {
  const headerRef = useRef<HTMLElement | null>(null);
  const pathname = usePathname();
  const { user, signOut, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const handleScroll = () => {
      const shouldBeTransparent = window.scrollY > 20;
      header.style.backgroundColor = shouldBeTransparent
        ? 'transparent'
        : 'var(--bg-grey)';
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await signOut();
    router.push(AUTH_PATH);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <header ref={headerRef}>
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
      {user ? (
        <>
          <div className='buttons-container'>
            <Link
              href={`${DASHBOARD_PAGES.HOME}`}
              className={`button ${pathname === `${DASHBOARD_PAGES.HOME}` ? 'active' : ''}`}
            >
              Home
            </Link>
            <Link
              href={`${DASHBOARD_PAGES.REST}`}
              className={`button ${pathname === `${DASHBOARD_PAGES.REST}` ? 'active' : ''}`}
            >
              REST Client
            </Link>
            <Link
              href={`${DASHBOARD_PAGES.HISTORY}`}
              className={`button ${pathname === `${DASHBOARD_PAGES.HISTORY}` ? 'active' : ''}`}
            >
              History
            </Link>
            <Link
              href={`${DASHBOARD_PAGES.VARIABLES}`}
              className={`button ${pathname === `${DASHBOARD_PAGES.VARIABLES}` ? 'active' : ''}`}
            >
              Variables
            </Link>
          </div>
          <div className='buttons-container'>
            <select>
              <option value='En'>En</option>
              <option value='Ru'>Ru</option>
            </select>

            <button
              className={`button ${pathname === '/auth' ? 'active' : ''}`}
              onClick={handleLogout}
            >
              Sign Out
            </button>
          </div>
        </>
      ) : (
        <>
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
        </>
      )}
    </header>
  );
};

export default Header;
