import { z } from 'zod';

import { SignInSchema, SignUpSchema } from '@/utils/validators';

export type AuthFormTypes = {
  email: string;
  password: string;
};
export type SignUpFormData = z.infer<typeof SignUpSchema>;
export type SignInFormData = z.infer<typeof SignInSchema>;

interface FormFieldConfig<T> {
  name: keyof T;
  type: string;
  placeholder: string;
}

export type AuthMode = 'signup' | 'signin';

export const FORM_FIELDS_CONFIG = {
  signup: [
    // {
    //   name: 'name',
    //   type: 'text',
    //   placeholder: 'Enter your name',
    // },
    {
      name: 'email',
      type: 'email',
      placeholder: 'Enter your email',
    },
    {
      name: 'password',
      type: 'password',
      placeholder: 'Choose a password',
    },
    {
      name: 'confirmPassword',
      type: 'password',
      placeholder: 'Password again',
    },
  ] as FormFieldConfig<SignUpFormData>[],
  signin: [
    {
      name: 'email',
      type: 'email',
      placeholder: 'Enter your email address',
    },
    {
      name: 'password',
      type: 'password',
      placeholder: 'Enter your password',
    },
  ] as FormFieldConfig<SignUpFormData>[],
};
