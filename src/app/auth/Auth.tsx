'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { DASHBOARD_PAGES, REGISTER_PATH } from '@/config/pages-url.config';

import { supabase } from '@/lib/supabase';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);

    if (error) return alert(error.message);
    router.replace(DASHBOARD_PAGES.HOME);
  };

  const handleRegister = () => {
    router.push(REGISTER_PATH);
  };

  return (
    <div>
      <h1>Вход</h1>
      <input
        type='email'
        placeholder='Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type='password'
        placeholder='Пароль'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={handleLogin}
        disabled={loading}
      >
        {loading ? 'Вход...' : 'Войти'}
      </button>
      <button onClick={handleRegister}>Зарегистрироваться</button>
    </div>
  );
};

export default Auth;
