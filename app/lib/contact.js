// The one place the contact email lives. Change it here and the contact form,
// the "copy email" button, the error fallback and the case study access
// request all follow.
export const CONTACT_EMAIL = 'gamzeebozkurt@gmail.com';

// Sends a message straight to CONTACT_EMAIL through formsubmit.co (no mail app
// needed on the visitor's side). Resolves true on success, false otherwise.
export async function sendToInbox({ subject, name, email, message }) {
  try {
    const res = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ name, email, message, _subject: subject }),
    });
    return res.ok;
  } catch {
    return false;
  }
}
