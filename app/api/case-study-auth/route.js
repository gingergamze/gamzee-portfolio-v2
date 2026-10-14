import { NextResponse } from 'next/server';
import { CASE_STUDY_PASSWORD, AUTH_COOKIE, accessToken } from '../../lib/caseStudyAuth';

// The password lives in app/lib/caseStudyAuth.js — change it there.
export async function POST(request) {
  let password = '';
  try {
    ({ password } = await request.json());
  } catch {
    // fall through to the failure response below
  }

  if (password !== CASE_STUDY_PASSWORD) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(AUTH_COOKIE, await accessToken(), {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
  return res;
}
