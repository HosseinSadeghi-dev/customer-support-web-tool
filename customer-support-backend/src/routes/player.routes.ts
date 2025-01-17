import { Router } from "express";
import {
  createPlayerHandler,
  editPlayerHandler,
  listPlayersHandler,
  playerDetailHandler,
} from "../controllers/player.controller";

const router = Router();

router.post("/", createPlayerHandler);
router.put("/", editPlayerHandler);
router.get("/", listPlayersHandler);
router.get("/:id", playerDetailHandler);

export default router;
