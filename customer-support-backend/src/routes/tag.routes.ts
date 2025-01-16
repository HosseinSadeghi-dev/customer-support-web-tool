import { Router } from "express";
import { listTagsHandler } from "../controllers/tag.controller";

const router = Router();

router.get("/", listTagsHandler);

export default router;
