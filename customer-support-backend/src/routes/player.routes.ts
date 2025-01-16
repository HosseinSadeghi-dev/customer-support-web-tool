import { Router } from "express";
import {
  createPlayerHandler,
  listPlayersHandler,
  playerDetailHandler,
} from "../controllers/player.controller";

const router = Router();

router.post("/", createPlayerHandler);
router.get("/", listPlayersHandler);
router.get("/:id", playerDetailHandler);

export default router;
