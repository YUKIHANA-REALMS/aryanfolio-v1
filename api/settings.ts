import type { VercelRequest, VercelResponse } from '@vercel/node';
import { kv } from '@vercel/kv';

const SETTINGS_KEY = 'portfolio-settings';
const AUTH_KEY = 'portfolio-admin-password';

function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return 'h_' + Math.abs(hash).toString(36);
}

function verifyAuth(request: VercelRequest): boolean {
  const authHeader = request.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) return false;
  const token = authHeader.slice(7);
  try {
    const decoded = atob(token);
    const [user, passHash, ts] = decoded.split('|');
    const age = Date.now() - parseInt(ts, 10);
    if (age > 24 * 60 * 60 * 1000) return false;
    return user === 'admin';
  } catch {
    return false;
  }
}

export default async function handler(request: VercelRequest, response: VercelResponse) {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (request.method === 'OPTIONS') {
    return response.status(200).end();
  }

  if (request.method === 'GET') {
    try {
      const settings = await kv.get(SETTINGS_KEY);
      return response.status(200).json({ settings: settings || null });
    } catch (error) {
      return response.status(500).json({ error: 'Failed to fetch settings' });
    }
  }

  if (request.method === 'POST') {
    if (!verifyAuth(request)) {
      return response.status(401).json({ error: 'Unauthorized' });
    }

      const { settings, password, action } = request.body;

      if (action === 'setup') {
        try {
          const existingPassword = await kv.get(AUTH_KEY);
          if (existingPassword) {
            return response.status(400).json({ error: 'Password already set' });
          }
          await kv.set(AUTH_KEY, simpleHash(password));
          const token = btoa(`admin|${simpleHash(password)}|${Date.now()}`);
          return response.status(200).json({ success: true, token });
        } catch (error) {
          return response.status(500).json({ error: 'Failed to setup password' });
        }
      }

      if (action === 'login') {
        try {
          const storedHash = await kv.get(AUTH_KEY);
          if (!storedHash) {
            return response.status(400).json({ error: 'No password set. Use setup first.' });
          }
          if (simpleHash(password) !== storedHash) {
            return response.status(401).json({ error: 'Invalid password' });
          }
          const token = btoa(`admin|${simpleHash(password)}|${Date.now()}`);
          return response.status(200).json({ success: true, token });
        } catch (error) {
          return response.status(500).json({ error: 'Failed to verify password' });
        }
      }

      if (!settings) {
        return response.status(400).json({ error: 'Settings required' });
      }

      try {
        await kv.set(SETTINGS_KEY, settings);
        return response.status(200).json({ success: true });
      } catch (error) {
        return response.status(500).json({ error: 'Failed to save settings' });
      }
  }

  return response.status(405).json({ error: 'Method not allowed' });
}
