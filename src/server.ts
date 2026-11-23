import { app } from './app';
// import { config } from './lib/config'; //skip
// import { logger } from './lib/logger'; // skip

const PORT = 8000; // config.PORT

app.listen(PORT, () => {
  // CHANGED: logger doesn't exist yet. Original: logger.info({
  console.log({
    event: 'server:started',
    port: PORT,
    environment: 'development', // config.NODE_ENV
  });
});