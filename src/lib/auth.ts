import { cookies } from 'next/headers';
import crypto from 'crypto';

const COOKIE_NAME = 'itcg_admin_session';

function getAdminPassword(): string {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) {
    throw new Error('ADMIN_PASSWORD is not configured');
  }
  return password;
}

function getSessionSecret(): string {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error('SESSION_SECRET is not configured');
  }
  return secret;
}

// Create a deterministic session token based on password and secret salt
function getExpectedToken(): string {
  const secret = getSessionSecret();
  const password = getAdminPassword();
  return crypto.createHmac('sha256', secret).update(password).digest('hex');
}

export function verifyAdminPassword(password: string): boolean {
  if (!password) return false;
  try {
    const expectedPassword = getAdminPassword();
    return password.trim() === expectedPassword.trim();
  } catch {
    // Fail securely if ADMIN_PASSWORD is not configured
    return false;
  }
}

export function isUserAuthenticated(): boolean {
  try {
    const cookieStore = cookies();
    const session = cookieStore.get(COOKIE_NAME)?.value;
    if (!session) return false;
    return session === getExpectedToken();
  } catch {
    // Fail securely if credentials or cookies are invalid/unconfigured
    return false;
  }
}

export function createSessionToken(): string {
  return getExpectedToken();
}

export const ADMIN_COOKIE_NAME = COOKIE_NAME;

