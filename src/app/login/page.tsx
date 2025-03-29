import { login, signup } from './actions';
import styles from '@/app/page.module.css';

export default function LoginPage() {
  return (
    <div className={styles.mainContent}>
      <h1>Вход</h1>
      <form>
        <label htmlFor='email'>Email:</label>
        <input
          id='email'
          name='email'
          type='email'
          required
        />
        <label htmlFor='password'>Password:</label>
        <input
          id='password'
          name='password'
          type='password'
          required
        />
        <button
          className={`${styles.button} ${styles.button_colored}`}
          formAction={login}
        >
          Log in
        </button>
        <button
          className={`${styles.button} ${styles.button_colored}`}
          formAction={signup}
        >
          Sign up
        </button>
      </form>
    </div>
  );
}
