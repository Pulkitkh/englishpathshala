/**
 * Minimal session auth for the /admin dashboard.
 *
 * One shared password (ADMIN_PASSWORD) exchanged for an HMAC-signed cookie.
 * No user table, no third-party auth service — this dashboard has exactly
 * one user and it is you.
 */

import crypto from 'crypto';
import { cookies } from 'next/headers';

export const SESSION_COOKIE = 'ep_admin';
const SESSION_TTL_MS = 1000 * 60 * 60 * 12; // 12 hours

function secret(): string {
  const value = process.env.SESSION_SECRET || process.env.ADMIN_PASSWORD;
  if (!value) {
    throw new Error('SESSION_SECRET (or ADMIN_PASSWORD) must be set to use the admin dashboard.');
  }
  return value;
}

export function adminConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD);
}

function sign(payload: string): string {
  return crypto.createHmac('sha256', secret()).update(payload).digest('base64url');
}

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

export function checkPassword(candidate: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  return safeEqual(
    crypto.createHash('sha256').update(candidate).digest('hex'),
    crypto.createHash('sha256').update(expected).digest('hex'),
  );
}

export function createSessionToken(): string {
  const expiresAt = Date.now() + SESSION_TTL_MS;
  const payload = `admin.${expiresAt}`;
  return `${payload}.${sign(payload)}`;
}

export function verifySessionToken(token: string | undefined): boolean {
  if (!token) return false;
  const parts = token.split('.');
  if (parts.length !== 3) return false;
  const [subject, expiresAt, signature] = parts;
  if (subject !== 'admin') return false;
  const expiry = Number(expiresAt);
  if (!Number.isFinite(expiry) || Date.now() > expiry) return false;
  try {
    return safeEqual(sign(`${subject}.${expiresAt}`), signature);
  } catch {
    return false;
  }
}

/** For use inside server components and route handlers. */
export async function isAuthenticated(): Promise<boolean> {
  const store = await cookies();
  return verifySessionToken(store.get(SESSION_COOKIE)?.value);
}

export const sessionCookieOptions = {
  httpOnly: true,
  sameSite: 'lax' as const,
  secure: process.env.NODE_ENV === 'production',
  path: '/',
  maxAge: SESSION_TTL_MS / 1000,
};
