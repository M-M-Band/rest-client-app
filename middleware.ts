import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { AUTH_PATH, DASHBOARD_PAGES } from '@/config/pages-url.config';

// Вспомогательные функции
const isAuthPage = (pathname: string) => pathname.includes(AUTH_PATH);
const isRootPath = (pathname: string) => pathname === '/';
const getRedirectUrl = (path: string) =>
  new URL(path, process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000');

// Основная логика middleware
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('supabase-auth-token');

  // Если пользователь авторизован и находится на корневом пути
  if (isRootPath(pathname) && token) {
    return NextResponse.redirect(getRedirectUrl(DASHBOARD_PAGES.HOME));
  }

  // Если пользователь авторизован и находится на странице auth
  if (isAuthPage(pathname) && token) {
    return NextResponse.redirect(getRedirectUrl(DASHBOARD_PAGES.HOME));
  }

  // Если пользователь на странице auth
  if (isAuthPage(pathname)) {
    return NextResponse.next();
  }

  // Если пользователь не авторизован
  if (!token) {
    return NextResponse.redirect(getRedirectUrl(AUTH_PATH));
  }

  return NextResponse.next();
}

// Конфигурация для перехвата запросов
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
