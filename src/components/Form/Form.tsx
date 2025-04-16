'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import React, { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import {
  AuthMode,
  FORM_FIELDS_CONFIG,
  SignInFormData,
  SignUpFormData,
} from '@/types/auth.types';

import { SIGNIN_PATH, SIGNUP_PATH } from '@/config/pages-url.config';

import { getURL } from '@/utils/helpers';
import { SignInSchema, SignUpSchema } from '@/utils/validators';

import Input from '../Input/Input';

import styles from './Form.module.css';

const { form, container, button, button_border, container_formElements } =
  styles;

type AuthFormProps = {
  mode: AuthMode;
  onSubmit: (data: SignUpFormData | SignInFormData) => Promise<void>;
};

const Form: FC<AuthFormProps> = ({ mode, onSubmit }) => {
  const router = useRouter();
  const t = useTranslations('Main');
  const isSignUpMode = mode === 'signup';
  const locale = useLocale();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm<SignInFormData | SignUpFormData>({
    resolver: zodResolver(isSignUpMode ? SignUpSchema : SignInSchema),
    mode: 'all',
  });
  const buttonSubmitName = isSubmitting
    ? 'Waiting...'
    : isSignUpMode
      ? t('signUp')
      : t('signIn');
  const formName = isSignUpMode ? t('signUp') : t('signIn');
  const buttonChangeFormName = !isSignUpMode ? t('signUp') : t('signIn');
  const aboutFormText = isSignUpMode
    ? t('formSignUpDescription')
    : t('formSignInDescription');
  const fields = FORM_FIELDS_CONFIG[mode];

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

  const toogleFormHandler = () => {
    if (!isSignUpMode) {
      router.push(SIGNUP_PATH);
    } else {
      router.push(SIGNIN_PATH);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className={form}
      style={{ backgroundPosition: isSignUpMode ? 'top right' : '' }}
    >
      {`${getURL()}${locale}/dashboard`}
      {''}
      {process.env.NEXT_PUBLIC_SITE_URL}
      {''}
      {process.env.NEXT_PUBLIC_VERCEL_URL}
      <div className={container}>
        <h1 className='maintext maintext_green'>{formName}</h1>
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
          disabled={!isValid || isSubmitting}
          className={`button button_colored ${button}`}
        >
          {buttonSubmitName}
        </button>
        <button
          type='button'
          className={`button ${button} ${button_border}`}
          onClick={toogleFormHandler}
        >
          {buttonChangeFormName}
        </button>
      </div>
    </form>
  );
};

export default Form;
