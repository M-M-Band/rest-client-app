'use server';

// import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { DASHBOARD_PAGES, ERROR_PATH } from '@/config/pages-url.config';

import { createClient } from '@/utils/supabase/server';

export async function login(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect(ERROR_PATH);
  }

  revalidatePath('/', 'layout');
  redirect(DASHBOARD_PAGES.HOME);
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    redirect(ERROR_PATH);
  }

  revalidatePath('/', 'layout');
  redirect(DASHBOARD_PAGES.HOME);
}
