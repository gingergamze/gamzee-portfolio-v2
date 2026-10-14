import { NextResponse } from 'next/server';
import { AUTH_COOKIE, accessToken } from './app/lib/caseStudyAuth';

// Every /work/<slug> case study is gated behind a password. The actual
// check lives in app/api/case-study-auth/route.js and the password itself in
// app/lib/caseStudyAuth.js
// — this file only decides, on each request, whether the visitor already
// has a valid "unlocked" cookie. If not, it rewrites (not redirects) to
// /work-locked so the URL bar still shows the real case study URL, but the
// real content never reaches the browser until they're authenticated.
export async function middleware(request) {
  // The cookie holds a fingerprint of the current password, so a cookie saved
  // with an old password stops working as soon as the password is changed.
  const cookie = request.cookies.get(AUTH_COOKIE);
  if (cookie?.value && cookie.value === (await accessToken())) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = '/work-locked';
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: '/work/:path*',
};
