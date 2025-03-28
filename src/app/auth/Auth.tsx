'use client';

import React, { useState } from 'react';

import Form from '@/components/Form/Form';

import { AuthMode, SignInFormData, SignUpFormData } from '@/types/auth.types';

const Auth = () => {
  const [mode, setMode] = useState<AuthMode>('signup');
  const handleSubmit = (data: SignUpFormData | SignInFormData) => {
    if (mode === 'signup') {
      console.log('SignUp:', data);
    } else {
      console.log('SignIn:', data);
    }
  };
  const toggleMode = () => {
    setMode(mode === 'signup' ? 'signin' : 'signup');
  };
  return (
    <div>
      <Form
        mode={mode}
        onSubmit={handleSubmit}
      />
      <button
        onClick={toggleMode}
        style={{ padding: 20 }}
      >
        {mode === 'signup' ? 'SignUp' : 'Sign In'}
      </button>
    </div>
  );
};

export default Auth;
