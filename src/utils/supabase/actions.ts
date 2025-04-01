'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { SignInFormData, SignUpFormData } from '@/types/auth.types';

import { DASHBOARD_PAGES, ERROR_PATH } from '@/config/pages-url.config';

import { createClient } from './server';

export async function signIn(formData: SignInFormData) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword(formData);

  if (error) {
    redirect(ERROR_PATH);
  }

  revalidatePath('/', 'layout');
  redirect(DASHBOARD_PAGES.HOME);
}

export async function signUp(formData: SignUpFormData) {
  const supabase = await createClient();
  const { email, password, name } = formData;

  const { error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        first_name: name,
      },
    },
  });

  if (error) {
    redirect(ERROR_PATH);
  }

  revalidatePath('/', 'layout');
  redirect(DASHBOARD_PAGES.HOME);
}
