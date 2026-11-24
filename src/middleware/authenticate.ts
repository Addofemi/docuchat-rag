// src/middleware/auth.ts

import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../lib/tokens';

// Extend Express Request to include user
declare global {
  namespace Express {
    interface Request {
      user?: { id: string; role: string };
    }
  }
}

// CHANGED: added ": void" and split "return res.status(...)" into two lines (Express 5 typings)
export function authenticate(
  req: Request, res: Response, next: NextFunction
): void {
  const header = req.headers.authorization;

  if (!header || !header.startsWith('Bearer ')) {
    res.status(401).json({ error: 'No token provided' });
    return;
  }

  const token = header.split(' ')[1];

  try {
    const payload = verifyAccessToken(token);

    // Make sure it's an access token, not a refresh token
    if (payload.type !== 'access') {
      res.status(401).json({ error: 'Invalid token type' });
      return;
    }

    // Attach user context to the request
    req.user = { id: payload.sub, role: payload.role };
    next();

  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      res.status(401).json({ error: 'Token expired' });
      return;
    }
    res.status(401).json({ error: 'Invalid token' });
  }
}