'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import React from 'react';

import { supabase } from '@/lib/supabase';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`
      }    });
    setLoading(false);

    if (error) return alert(error.message);
    alert('Письмо с подтверждением отправлено!');
    router.push('/auth'); // Перенаправляем на вход
  };
  return (
    <div className='flex flex-col items-center p-8'>
      <h1 className='text-2xl font-bold mb-4'>Регистрация</h1>
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
        onClick={handleRegister}
        className='bg-green-500 text-white px-4 py-2 rounded'
        disabled={loading}
      >
        {loading ? 'Регистрация...' : 'Зарегистрироваться'}
      </button>
    </div>
  );
};

export default Register;
