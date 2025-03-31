'use client';

import React, { FC, useState } from 'react';

import Form from '@/components/Form/Form';

import { AuthMode, SignInFormData, SignUpFormData } from '@/types/auth.types';

interface AuthActions {
  signInAction: (formData: SignInFormData) => Promise<void>;
  signUpAction: (formData: SignUpFormData) => Promise<void>;
}

const Auth: FC<AuthActions> = ({ signInAction, signUpAction }) => {
  const [mode, setMode] = useState<AuthMode>('signup');
  const isSignUpMode = mode === 'signup';
  const handleSubmit = async (formData: SignUpFormData | SignInFormData) => {
    if (isSignUpMode) {
      await signUpAction(formData as SignUpFormData);
    } else {
      await signInAction(formData as SignInFormData);
    }
  };
  return (
    <Form
      mode={mode}
      onSubmit={handleSubmit}
      setMode={setMode}
      isSignUpMode={isSignUpMode}
    />
  );
};

export default Auth;
