/**
 * Thin API client for the AetherTech backend.
 *
 * In dev and preview the Vite proxy forwards /api to the Express server
 * (see vite.config.ts). In production the same origin serves both, so the
 * relative paths keep working with no configuration.
 */

export interface ApiResult<T> {
  ok: boolean;
  data?: T;
  error?: string;
}

async function post<T>(path: string, payload: unknown): Promise<ApiResult<T>> {
  try {
    const res = await fetch(path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = (await res.json().catch(() => ({}))) as T & { error?: string };
    if (!res.ok) return { ok: false, error: data?.error || `Request failed (${res.status})` };
    return { ok: true, data };
  } catch {
    return { ok: false, error: 'Network unreachable. Please retry in a moment.' };
  }
}

export interface ContactPayload {
  name: string;
  email?: string;
  organization?: string;
  category?: string;
  message: string;
}

export interface ContactReceipt {
  ok: boolean;
  id: string;
  receivedAt: string;
}

export interface WaitlistPayload {
  email: string;
  product?: string;
  source?: string;
}

export interface WaitlistReceipt {
  ok: boolean;
  id: string;
  alreadyRegistered: boolean;
}

export const api = {
  contact: (payload: ContactPayload) => post<ContactReceipt>('/api/contact', payload),
  waitlist: (payload: WaitlistPayload) => post<WaitlistReceipt>('/api/waitlist', payload),
  health: async (): Promise<boolean> => {
    try {
      const res = await fetch('/api/health');
      return res.ok;
    } catch {
      return false;
    }
  },
};

export const isValidEmail = (value: string) => /^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(value.trim());
