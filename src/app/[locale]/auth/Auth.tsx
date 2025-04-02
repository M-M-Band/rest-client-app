'use client';

import React, { FC } from 'react';

import Form from '@/components/Form/Form';

import { AuthMode, SignInFormData, SignUpFormData } from '@/types/auth.types';

interface AuthProps {
  mode: AuthMode;
  onSubmit: (formData: SignUpFormData | SignInFormData) => Promise<void>;
}

const Auth: FC<AuthProps> = ({ mode, onSubmit }) => {
  return (
    <Form
      mode={mode}
      onSubmit={onSubmit}
      isSignUpMode={mode === 'signup'}
    />
  );
};

export default Auth;
