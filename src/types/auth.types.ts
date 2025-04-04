import { Session } from '@supabase/supabase-js';
// import { useTranslations } from 'next-intl';
import { z } from 'zod';

import { SignInSchema, SignUpSchema } from '@/utils/validators';

// const t = useTranslations('Main');

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
    {
      name: 'name',
      type: 'text',
      placeholder: 'Enter your name',
      // placeholder: t('formSignUpNamePlaceholder'),
    },
    {
      name: 'email',
      type: 'email',
      placeholder: 'Enter your email',
      // placeholder: t('formSignUpEmailPlaceholder'),
    },
    {
      name: 'password',
      type: 'password',
      placeholder: 'Choose a password',
      // placeholder: t('formSignUpPasswordPlaceholder'),
    },
    {
      name: 'confirmPassword',
      type: 'password',
      placeholder: 'Password again',
      // placeholder: t('formSignUpConfirmPasswordPlaceholder'),
    },
  ] as FormFieldConfig<SignUpFormData>[],
  signin: [
    {
      name: 'email',
      type: 'email',
      placeholder: 'Enter your email address',
      // placeholder: t('formSignInEmailPlaceholder'),
    },
    {
      name: 'password',
      type: 'password',
      placeholder: 'Enter your password',
      // placeholder: t('formSignInPasswordPlaceholder'),
    },
  ] as FormFieldConfig<SignUpFormData>[],
};

interface Identity {
  id: string;
  user_id: string;
  identity_id: string;
  email: string;
  created_at: string;
  updated_at: string;
  last_sign_in_at: string;
  provider: string;
  identity_data: {
    email: string;
    email_verified: boolean;
    phone_verified: boolean;
    sub: string;
    age?: number;
    first_name?: string;
  };
}

interface UserMetadata {
  email: string;
  email_verified: boolean;
  phone_verified: boolean;
  sub: string;
}

interface AppMetadata {
  provider: string;
  providers: string[];
}
// export interface SignInFormData {
//   email: string;
//   pass: string;
// }

// export interface SignUpFormData {
//   email: string;
//   pass: string;
//   firstName: string;
// }

export interface User {
  id: string;
  aud: string;
  role: string;
  email: string;
  email_confirmed_at: string;
  confirmation_sent_at: string;
  created_at: string;
  updated_at: string;
  last_sign_in_at: string;
  is_anonymous: boolean;
  phone: string;
  app_metadata: AppMetadata;
  user_metadata: UserMetadata;
  identities: Identity[];
}
export interface AuthSession {
  session: Session | null;
}
