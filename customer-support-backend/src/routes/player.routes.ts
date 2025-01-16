import { Router } from "express";
import {
  createPlayerHandler,
  listPlayersHandler,
} from "../controllers/player.controller";

const router = Router();

router.post("/", createPlayerHandler);
router.get("/", listPlayersHandler);

export default router;
