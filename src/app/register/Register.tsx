'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import React from 'react';

import { AUTH_PATH } from '@/config/pages-url.config';

// import { supabase } from '@/lib/supabase';

import styles from '@/app/page.module.css';
const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async () => {
    setLoading(true);
    // const { error } = await supabase.auth.signUp({
    //   email,
    //   password,
    //   options: {
    //     emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    //   },
    // });
    setLoading(false);

    // if (error) return alert(error.message);
    alert('Письмо с подтверждением отправлено!');
    router.push(AUTH_PATH); // Перенаправляем на вход
  };
  return (
    <div className={styles.mainContent}>
      <h1 className=''>Регистрация</h1>
      <input
        type='email'
        placeholder='Email'
        className=''
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type='password'
        placeholder='Пароль'
        className=''
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={handleRegister}
        className={`${styles.button} ${styles.button_colored}`}
        disabled={loading}
      >
        {loading ? 'Регистрация...' : 'Зарегистрироваться'}
      </button>
    </div>
  );
};

export default Register;
