import { Router } from "express";
import {
  addSanctionHandler,
  revokeSanctionHandler,
  listSanctionsHandler,
} from "../controllers/sanction.controller";

const router = Router();

// Route to add a new sanction
router.post("/", addSanctionHandler);

// Route to revoke an existing sanction
router.delete("/:id", revokeSanctionHandler);

// Route to list all sanctions for a specific player
router.get("/:playerId", listSanctionsHandler);

export default router;
