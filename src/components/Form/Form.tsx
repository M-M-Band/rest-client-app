'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React, { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import {
  AuthMode,
  FORM_FIELDS_CONFIG,
  SignInFormData,
  SignUpFormData,
} from '@/types/auth.types';

import { SignInSchema, SignUpSchema } from '@/utils/validators';

import Input from '../Input/Input';

import styles from './Form.module.css';

const { form, container, button, container_formElements } = styles;

type AuthFormProps = {
  mode: AuthMode;
  onSubmit: (dataForm: SignUpFormData | SignInFormData) => void;
};

const Form: FC<AuthFormProps> = ({ mode, onSubmit }) => {
  const isSignUp = mode === 'signup';
  const fields = FORM_FIELDS_CONFIG[mode];
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignInFormData | SignUpFormData>({
    resolver: zodResolver(isSignUp ? SignUpSchema : SignInSchema),
    mode: 'all',
  });

  const handleFormSubmit: SubmitHandler<SignInFormData | SignUpFormData> = (
    dataForm
  ) => {
    if (isSignUp) {
      onSubmit(dataForm as SignUpFormData);
    } else {
      onSubmit(dataForm as SignInFormData);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className={form}
    >
      <div className={container}>
        <h1 className='maintext maintext_green'>Sign In/Sign Up</h1>
        <p className='subtext'>
          Welcome back! Please log in to access your account.
        </p>
      </div>
      <div className={`${container} ${container_formElements}`}>
        {fields.map((field) => (
          <Input
            key={field.name}
            type={field.type}
            id={field.name}
            {...register(field.name)}
            placeholder={field.placeholder}
            errorMsg={errors[field.name as keyof typeof errors]?.message}
          />
        ))}
        <button
          type='submit'
          formNoValidate
          disabled={!isValid}
          className={`button button_colored ${button}`}
        >
          Sign Up/Sign In
        </button>
      </div>
    </form>
  );
};

export default Form;
