// src/routes/documents.ts


import { Router } from 'express';
import { authenticate } from '../middleware/authenticate'; // CHANGED: was '../middleware/auth' in (lesson), my file is authenticate.ts
const router = Router();

// Public route - no auth needed
router.get('/health', (req, res) => res.json({ status: 'ok' }));

// Protected route - requires valid access token
// CHANGED: the Document model doesn't exist yet, so prisma.document would fail. Original:
// router.get('/documents', authenticate, async (req, res) => {
//   // req.user is guaranteed to exist here
//   const docs = await prisma.document.findMany({
//     where: { userId: req.user!.id },
//   });
//   res.json(docs);
// });
router.get('/documents', authenticate, (req, res) => {
  res.json({ message: 'Authenticated', user: req.user });
});