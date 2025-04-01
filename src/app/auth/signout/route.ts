import { revalidatePath } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';

import { AUTH_PATH } from '@/config/pages-url.config';

import { createClient } from '@/utils/supabase/server';

export async function POST(req: NextRequest) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    await supabase.auth.signOut();
  }

  revalidatePath('/', 'layout');
  return NextResponse.redirect(new URL(AUTH_PATH, req.url), {
    status: 302,
  });
}
