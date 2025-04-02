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
  onSubmit: (data: SignUpFormData | SignInFormData) => Promise<void>;
  isSignUpMode: boolean;
};

const Form: FC<AuthFormProps> = ({ mode, onSubmit, isSignUpMode }) => {
  const formNameAndButtonSubmitName = isSignUpMode ? 'Sign Up' : 'Sign In';
  const aboutFormText = isSignUpMode
    ? "Let's get started! Create your account in just a few steps."
    : 'Good to see you again! Sign in to continue your journey.';
  const fields = FORM_FIELDS_CONFIG[mode];
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<SignInFormData | SignUpFormData>({
    resolver: zodResolver(isSignUpMode ? SignUpSchema : SignInSchema),
    mode: 'all',
  });

  const handleFormSubmit: SubmitHandler<
    SignInFormData | SignUpFormData
  > = async (dataForm) => {
    if (isSignUpMode) {
      await onSubmit(dataForm as SignUpFormData);
    } else {
      await onSubmit(dataForm as SignInFormData);
    }
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className={form}
    >
      <div className={container}>
        <h1 className='maintext maintext_green'>
          {formNameAndButtonSubmitName}
        </h1>
        <p className='subtext'>{aboutFormText}</p>
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
      </div>
      <div className={container}>
        <button
          type='submit'
          formNoValidate
          disabled={!isValid}
          className={`button button_colored ${button}`}
        >
          {formNameAndButtonSubmitName}
        </button>
      </div>
    </form>
  );
};

export default Form;
