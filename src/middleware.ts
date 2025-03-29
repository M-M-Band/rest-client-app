import { type NextRequest, NextResponse } from 'next/server';

import { updateSession } from '@/utils/supabase/middleware';
import { createClient } from '@/utils/supabase/server';

import { DASHBOARD_PAGES, LOGIN_PATH } from './config/pages-url.config';

export async function middleware(request: NextRequest) {
  console.log('middleware');
  // update user's auth session
  const response = await updateSession(request);

  // Create a Supabase client to check the user's session
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // If the user is not authenticated and the requested path is not /login, redirect to /login
  if (!user && request.nextUrl.pathname.includes(DASHBOARD_PAGES.HOME)) {
    console.log('user', !!user);
    console.log('url', request.nextUrl.pathname);
    return NextResponse.redirect(new URL(LOGIN_PATH, request.url));
  }

  // If the user is authenticated or the requested path is /login, continue
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - login (login page)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|login|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
