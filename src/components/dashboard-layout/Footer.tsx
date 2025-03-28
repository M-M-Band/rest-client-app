import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import rsLogo from '../../../public/RSLogo.png';
import githubLink from '../../../public/github.png';
import styles from '../../app/page.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className='container container_dark'>
        <Link href='https://github.com/M-M-Band/rest-client-app'>
          <Image
            priority={true}
            width={60}
            height={60}
            src={githubLink}
            alt='githubLink'
          />
        </Link>
        <p style={{ fontWeight: '100' }}>2025 The Rolling Scopes</p>
        <Link href='https://rs.school/'>
          <Image
            priority={true}
            width={60}
            height={60}
            src={rsLogo}
            alt='RSSchoolLogo'
          />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
