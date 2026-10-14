// Case study password protection — shared by the login route and middleware.
//
// Change the password here and nothing else. The "unlocked" cookie holds a
// fingerprint of the password (not a fixed word), so the moment the password
// changes, every browser that unlocked the case studies with the old one is
// locked out again and has to enter the new password.
export const CASE_STUDY_PASSWORD = '4321';

export const AUTH_COOKIE = 'case_study_access';

// Works in both the Node route and the Edge middleware (Web Crypto).
export async function accessToken() {
  const data = new TextEncoder().encode(`case-study-access:${CASE_STUDY_PASSWORD}`);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('');
}
