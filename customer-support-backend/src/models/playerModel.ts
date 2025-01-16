import db from "../config/database";
import { TagDTO } from "../repositories/tag.repo";
import { addTag } from "../repositories/tag.repo";
import { addPlayerTag } from "../repositories/playerTag.repo";

export const createPlayer = (name: string, tagNames: string[]) => {
  const stmt = db.prepare("INSERT INTO Players (name) VALUES (?)");
  const result = stmt.run(name);
  const playerId = result.lastInsertRowid as number;

  tagNames.forEach((tagName: string) => {
    addTag(tagName);

    const tagResult = db
      .prepare<Partial<TagDTO>, TagDTO>("SELECT id FROM Tags WHERE name = ?")
      .get({ name: tagName });

    if (!tagResult) {
      throw new Error(`Tag "${tagName}" does not exist.`);
    }

    const tagId = tagResult.id;
    addPlayerTag(playerId, tagId);
  });

  return playerId;
};

export const getPlayerById = (id: number) => {
  return db.prepare("SELECT * FROM Players WHERE id = ?").get(id);
};

export const listPlayers = () => {
  return db.prepare("SELECT * FROM Players").all();
};
