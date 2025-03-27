'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import React from 'react';

import { DASHBOARD_PAGES } from '@/config/pages-url.config';

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
    console.log('Successfully login!');
    router.push(DASHBOARD_PAGES.HOME); // Перенаправление после успешного входа
  };
  const handleRegister = () => {
    // router.push(DASHBOARD_PAGES.REGISTER);
    router.push('/register');
  }
  return (
    <div className='flex flex-col items-center p-8'>
      <h1 className='text-2xl font-bold mb-4'>Вход</h1>
      <input
        type='email'
        placeholder='Email'
        className='border p-2 mb-2'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type='password'
        placeholder='Пароль'
        className='border p-2 mb-4'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={handleLogin}
        className='bg-blue-500 text-white px-4 py-2 rounded'
        disabled={loading}
      >
        {loading ? 'Вход...' : 'Войти'}
      </button>
      <button onClick={handleRegister}>Зарегистрироваться</button>
    </div>
  );
};

export default Auth;
