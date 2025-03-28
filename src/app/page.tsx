import Link from 'next/link';

import { AUTH_PATH, REGISTER_PATH } from '@/config/pages-url.config';

import styles from './page.module.css';

export default function Home() {
  return (
    <>
      <div className={styles.mainContent}>
        <h1 className={styles.title}>
          Welcome to <span className={styles.span}>REST Client</span>
        </h1>
        <p>
          A REST client enables and simplifies communication with any open
          RESTful API. It offers an abstraction over HTTP libraries that allows
          for convenient conversion to an HTTP request, and the creation of
          objects from an HTTP response.
          <br />
          To start using the application please sign up or login.
        </p>
        <div
          className={`${styles.buttons_container} ${styles.buttons_container_w200}`}
        >
          <Link
            href={REGISTER_PATH}
            className={`${styles.button} ${styles.button_colored}`}
          >
            Sign in
          </Link>
          <Link
            href={AUTH_PATH}
            className={`${styles.button} ${styles.button_colored}`}
          >
            Login
          </Link>
        </div>
      </div>
    </>
  );
}
