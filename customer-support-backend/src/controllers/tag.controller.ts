import { Request, Response } from "express";
import { listTags } from "../models/tag.model";
import { logger } from "../config/logger";

export const listTagsHandler = async (_req: Request, res: Response) => {
  try {
    const tags = listTags();
    res.json(tags);
  } catch (error) {
    logger.error("Error fetching tags:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
