import React from 'react';
import styles from '../../app/page.module.css';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../../public/logo.svg';

const Header = () => {
  return <header className='container'>
      
      <div className={styles.buttons_container}>
      <Link href='/'>
        <Image priority={true} width={30} height={30} src={logo} alt='logo' />
      </Link>
        <p className={styles.logo}>Rest Client</p>
      </div>
      <div className={styles.buttons_container}>
        <Link href='/' className={styles.button}>Home</Link>
        <Link href='/about' className={styles.button}>About</Link>
      </div>
      <div className={styles.buttons_container}>
        <select className={styles.select}>
          <option value="En">En</option>
          <option value="Ru">Ru</option>
        </select>
        <Link href='/auth' className={styles.button}>Sign in</Link>
        <Link href='/auth' className={styles.button}>Login</Link>
      </div>
  </header>;
};

export default Header;
