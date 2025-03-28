'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { SignUpFormData } from '@/types/auth.types';

import { SignUpSchema } from '@/utils/validators';

import Input from '../Input/Input';

import styles from './Form.module.css';

const { form, container, title, subtitle, button, container_formElements } =
  styles;

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(SignUpSchema),
    mode: 'all',
  });

  const onSubmit: SubmitHandler<SignUpFormData> = (dataForm) => {
    console.log(dataForm);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={form}
    >
      <div className={container}>
        <h1 className={title}>Sign In/Sign Up</h1>
        <p className={subtitle}>
          Welcome back! Please log in to access your account.
        </p>
      </div>
      <div className={`${container} ${container_formElements}`}>
        {/* <Input
        type='text'
        id='name'
        {...register('name')}
        errorMsg={errors.name?.message}
      /> */}
        <Input
          type='email'
          id='email'
          {...register('email')}
          errorMsg={errors.email?.message}
          placeholder='Enter your email'
        />
        <Input
          type='password'
          id='password'
          {...register('password')}
          errorMsg={errors.password?.message}
          placeholder='Enter your password'
        />
        <Input
          type='password'
          id='confirmPassword'
          {...register('confirmPassword')}
          errorMsg={errors.confirmPassword?.message}
          placeholder='Enter your confirm password'
        />
        <button
          type='submit'
          formNoValidate
          disabled={!isValid}
          className={button}
        >
          Sign Up/Sign In
        </button>
      </div>
    </form>
  );
};

export default Form;
