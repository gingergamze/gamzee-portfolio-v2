import { NextResponse } from 'next/server';

// Single shared password for every case study. Change it here whenever
// you like — no other file needs to change.
const CASE_STUDY_PASSWORD = 'gamzee2026';

const AUTH_COOKIE = 'case_study_access';
const AUTH_VALUE = 'granted';

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
  res.cookies.set(AUTH_COOKIE, AUTH_VALUE, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
  return res;
}
