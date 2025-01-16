import { Request, Response } from "express";
import { listTags } from "../models/tag.model";

export const listTagsHandler = (_req: Request, res: Response) => {
  const tags = listTags();
  res.json(tags);
};
