import { Router } from "express";
import {
  addSanctionHandler,
  revokeSanctionHandler,
  listSanctionsHandler,
} from "../controllers/sanction.controller";

const router = Router();

router.post("/", addSanctionHandler);
router.delete("/:id", revokeSanctionHandler);
router.get("/:playerId", listSanctionsHandler);

export default router;
