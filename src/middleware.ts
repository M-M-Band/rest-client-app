import { type NextRequest, NextResponse } from 'next/server';

import { updateSession } from '@/utils/supabase/middleware';
import { createClient } from '@/utils/supabase/server';

import { AUTH_PATH, DASHBOARD_PAGES } from './config/pages-url.config';

export async function middleware(request: NextRequest) {
  const response = await updateSession(request);

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && request.nextUrl.pathname.includes(DASHBOARD_PAGES.HOME)) {
    return NextResponse.redirect(new URL(AUTH_PATH, request.url));
  }

  if (user && request.nextUrl.pathname.includes(AUTH_PATH)) {
    return NextResponse.redirect(new URL(DASHBOARD_PAGES.HOME, request.url));
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|login|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
