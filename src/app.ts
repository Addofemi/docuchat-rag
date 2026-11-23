
// Import event listeners so they register on startup
import './events/auth.events';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
// import { config } from './lib/config'; //skip
// import { logger } from './lib/logger'; //skip
// import { errorHandler } from './middleware/error-handler'; // skip

// Import routes (you will create these in upcoming lessons)
// import { authRoutes } from './routes/auth.routes';

// CHANGED: added "export" so service.ts can import it
export const app = express();


// === MIDDLEWARE (runs on every request) ===
app.use(helmet());              // Security headers
app.use(cors());                // Cross-origin requests
app.use(express.json());        // Parse JSON request bodies

// // === REQUEST LOGGING === //skip
// app.use((req, res, next) => {
//   logger.info({
//     method: req.method,
//     url: req.url,
//     ip: req.ip,
//   });
//   next();
// });

// === HEALTH CHECK ===
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    // CHANGED: config doesn't exist yet. Original: config.NODE_ENV
    environment: process.env.NODE_ENV || 'development',
  });
});

// === ROUTES (mounted here as you build them) === //optional
// app.use('/api/v1/auth', authRoutes);
// app.use('/api/v1/documents', documentRoutes);
// app.use('/api/v1/chat', chatRoutes);

// === ERROR HANDLER (must be last middleware) ===
// app.use(errorHandler); // skip

