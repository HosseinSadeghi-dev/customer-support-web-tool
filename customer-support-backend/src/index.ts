import app from './app';
import { logger } from './config/logger';

const PORT = 5000;

app.listen(PORT, () => {
  logger.info(`Server is running on http://localhost:${PORT}`);
});
