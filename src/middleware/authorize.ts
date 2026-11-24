// src/middleware/authorize.ts
import { Request, Response, NextFunction } from 'express';

export function authorize(...allowedRoles: string[]) {
  // CHANGED: added ": void" and split "return res.status(...)" into two lines (Express 5 typings)
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ error: 'Not authenticated' });
      return;
    }
    if (!allowedRoles.includes(req.user.role)) {
      res.status(403).json({ error: 'Insufficient permissions' });
      return;
    }
    next();
  };
}

// CHANGED: the usage example is commented out. It needs router, authenticate and
// deleteUserHandler, which don't exist in this file. You'll use it inside a routes file.


// Usage:
// router.delete('/admin/users/:id',
//   authenticate,
//   authorize('enterprise'),
//   deleteUserHandler
// );