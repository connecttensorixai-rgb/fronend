// Talks to the TensorixAI Hiring (HR) server. Set VITE_HR_API_URL in .env (no trailing slash needed).
export const HR_API = (import.meta.env.VITE_HR_API_URL || '').replace(/\/+$/, '');

// Public: open roles shown on the careers page (managed on the HR tool's Roles page, stored in Firestore)
export async function fetchRoles() {
  if (!HR_API) throw new Error('VITE_HR_API_URL is not set');
  const res = await fetch(`${HR_API}/api/public/roles`);
  if (!res.ok) throw new Error('Could not load roles');
  const out = await res.json();
  return out.roles || [];
}