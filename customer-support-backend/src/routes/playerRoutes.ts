import { Router } from 'express';
import { createPlayerHandler, listPlayersHandler } from '../controllers/playerController';

const router = Router();

router.post('/', createPlayerHandler);
router.get('/', listPlayersHandler);

export default router;
