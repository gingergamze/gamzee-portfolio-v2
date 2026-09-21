import { NextResponse } from 'next/server';

// Every /work/<slug> case study is gated behind a password. The actual
// check (and the password itself) lives in app/api/case-study-auth/route.js
// — this file only decides, on each request, whether the visitor already
// has a valid "unlocked" cookie. If not, it rewrites (not redirects) to
// /work-locked so the URL bar still shows the real case study URL, but the
// real content never reaches the browser until they're authenticated.
const AUTH_COOKIE = 'case_study_access';
const AUTH_VALUE = 'granted';

export function middleware(request) {
  const cookie = request.cookies.get(AUTH_COOKIE);
  if (cookie?.value === AUTH_VALUE) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = '/work-locked';
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: '/work/:path*',
};
