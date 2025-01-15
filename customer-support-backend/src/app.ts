import express from 'express';
import morgan from 'morgan';
import { logger } from './config/logger';
import playerRoutes from './routes/playerRoutes';
import sanctionRoutes from './routes/sanctionRoutes';

const app = express();

app.use(express.json());
app.use(morgan('combined', { stream: { write: (message) => logger.info(message.trim()) } }));

app.use('/players', playerRoutes);
app.use('/sanctions', sanctionRoutes);

// Centralized error handling
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send({ error: 'Something went wrong!' });
});

export default app;
