'use client';

import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import React, { ChangeEvent, useEffect, useRef } from 'react';

import { AUTH_PATH, DASHBOARD_PAGES } from '@/config/pages-url.config';

import logo from '../../public/logo.svg';

import { usePathname, useRouter } from '@/i18n/navigation';

const Header = () => {
  const headerRef = useRef<HTMLElement | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations('Main');

  const handleLangChange = (e: ChangeEvent<HTMLSelectElement>) => {
    router.replace({ pathname }, { locale: e.target.value });
  };

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
      <div className='buttons-container'>
        <Link
          href={`${DASHBOARD_PAGES.HOME}`}
          className={`button ${pathname === `${DASHBOARD_PAGES.HOME}` ? 'active' : ''}`}
        >
          {t('home')}
        </Link>
        <Link
          href={`${DASHBOARD_PAGES.REST}`}
          className={`button ${pathname === `${DASHBOARD_PAGES.REST}` ? 'active' : ''}`}
        >
          REST
        </Link>
        <Link
          href={`${DASHBOARD_PAGES.VARIABLES}`}
          className={`button ${pathname === `${DASHBOARD_PAGES.VARIABLES}` ? 'active' : ''}`}
        >
          {t('variables')}
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
          {t('signIn')}
        </Link>
        <Link
          href={`${AUTH_PATH}`}
          className={`button ${pathname === '/auth' ? 'active' : ''}`}
        >
          {t('signUp')}
        </Link>
      </div>
    </header>
  );
};

export default Header;
