import { NextRequest, NextResponse } from 'next/server';
import { decrypt } from '@/lib/auth';

export async function middleware(request: NextRequest) {
  const session = request.cookies.get('session')?.value;
  const path = request.nextUrl.pathname;

  // Защита админки
  if (path.startsWith('/adm')) {
    // Пропускаем страницу логина
    if (path === '/adm/login') {
      return NextResponse.next();
    }

    if (!session) {
      return NextResponse.redirect(new URL('/adm/login', request.url));
    }

    try {
      await decrypt(session);
      return NextResponse.next();
    } catch (e) {
      return NextResponse.redirect(new URL('/adm/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/adm/:path*'],
};
