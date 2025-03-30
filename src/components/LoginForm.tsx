'use client';

import { useState } from 'react';

import styles from '@/app/page.module.css';

interface LoginFormProps {
  loginAction: (formData: FormData) => Promise<void>;
  signupAction: (formData: FormData) => Promise<void>;
}

export default function LoginForm({
  loginAction,
  signupAction,
}: LoginFormProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    if (isLogin) {
      // Обработка входа
      await loginAction(formData);
    } else {
      // Обработка регистрации
      await signupAction(formData);
    }
    // Очистка формы после отправки
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
  };

  return (
    <div className={styles.mainContent}>
      <h1>{isLogin ? 'Вход' : 'Регистрация'}</h1>
      <div className={styles.toggleContainer}>
        <input
          type='radio'
          id='login'
          name='login'
          checked={isLogin}
          onChange={toggleForm}
        />
        <label htmlFor='login'>Login</label>
        <input
          type='radio'
          id='signup'
          name='login'
          checked={!isLogin}
          onChange={toggleForm}
        />
        <label htmlFor='signup'>Signup</label>
        {/* <button
          className={`${styles.button} ${isLogin ? styles.button_active : ''}`}
          onClick={toggleForm}
        >
          Вход
        </button>
        <button
          className={`${styles.button} ${!isLogin ? styles.button_active : ''}`}
          onClick={toggleForm}
        >
          Регистрация
        </button> */}
      </div>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <>
            <label htmlFor='name'>Имя:</label>
            <input
              id='name'
              name='name'
              type='text'
              required
              value={formData.name}
              onChange={handleChange}
            />
          </>
        )}
        <label htmlFor='email'>Email:</label>
        <input
          id='email'
          name='email'
          type='email'
          required
          value={formData.email}
          onChange={handleChange}
        />
        <label htmlFor='password'>Пароль:</label>
        <input
          id='password'
          name='password'
          type='password'
          required
          value={formData.password}
          onChange={handleChange}
        />
        {!isLogin && (
          <>
            <label htmlFor='confirmPassword'>Подтверждение пароля:</label>
            <input
              id='confirmPassword'
              name='confirmPassword'
              type='password'
              required
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </>
        )}
        <button
          className={`${styles.button} ${styles.button_colored}`}
          type='submit'
        >
          {isLogin ? 'Войти' : 'Зарегистрироваться'}
        </button>
      </form>
    </div>
  );
}
