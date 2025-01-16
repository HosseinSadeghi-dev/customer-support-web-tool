import db from "../config/database";
import { TagDTO } from "../repositories/tag.repo";

export const listTags = (): string[] => {
  const tags = db.prepare("SELECT name FROM Tags").all() as TagDTO[];
  return tags.map((tag) => tag.name);
};
