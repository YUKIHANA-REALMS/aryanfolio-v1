import { Redis } from '@upstash/redis';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const redis = new Redis({
  url: process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || '',
});

const SETTINGS_KEY = 'portfolio:settings';
const AUTH_KEY = 'portfolio:admin-password';

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
    const [, , ts] = decoded.split('|');
    const age = Date.now() - parseInt(ts, 10);
    if (age > 24 * 60 * 60 * 1000) return false;
    return decoded.startsWith('admin|');
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

  if (!process.env.KV_REST_API_URL && !process.env.UPSTASH_REDIS_REST_URL) {
    return response.status(500).json({
      error: 'Redis not configured. Set KV_REST_API_URL and KV_REST_API_TOKEN in Vercel env vars.',
    });
  }

  if (request.method === 'GET') {
    try {
      const settings = await redis.get(SETTINGS_KEY);
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
        const existingPassword = await redis.get(AUTH_KEY);
        if (existingPassword) {
          return response.status(400).json({ error: 'Password already set' });
        }
        await redis.set(AUTH_KEY, simpleHash(password));
        const token = btoa(`admin|${simpleHash(password)}|${Date.now()}`);
        return response.status(200).json({ success: true, token });
      } catch (error) {
        return response.status(500).json({ error: 'Failed to setup password' });
      }
    }

    if (action === 'login') {
      try {
        const storedHash = await redis.get(AUTH_KEY);
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
      await redis.set(SETTINGS_KEY, settings);
      return response.status(200).json({ success: true });
    } catch (error) {
      return response.status(500).json({ error: 'Failed to save settings' });
    }
  }

  return response.status(405).json({ error: 'Method not allowed' });
}
