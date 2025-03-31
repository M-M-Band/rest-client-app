'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import logo from '../../../public/logo.svg';

const Header = () => {
  const pathname = usePathname();
  return (
    <header>
      <Link
        href='/'
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
          href='/'
          className={`button ${pathname === '/' ? 'active' : ''}`}
        >
          Home
        </Link>
        <Link
          href='/about'
          className={`button ${pathname === '/about' ? 'active' : ''}`}
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
          href='/auth'
          className={`button ${pathname === '/auth' ? 'active' : ''}`}
        >
          Sign In
        </Link>
        <Link
          href='/auth'
          className={`button ${pathname === '/auth' ? 'active' : ''}`}
        >
          Sign Up
        </Link>
      </div>
    </header>
  );
};

export default Header;
