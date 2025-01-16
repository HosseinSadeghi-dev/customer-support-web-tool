import db from "../config/database";
import { addTag } from "../repositories/tag.repo";
import { addPlayerTag } from "../repositories/playerTag.repo";

export const createPlayer = (name: string, tagNames: string[]) => {
  const stmt = db.prepare("INSERT INTO Players (name) VALUES (?)");
  const result = stmt.run(name);
  const playerId = result.lastInsertRowid as number;
  tagNames.forEach((tagName: string) => {
    const tagResult = addTag(tagName);
    addPlayerTag(playerId, tagResult.id);
  });
  return playerId;
};

export const getPlayerById = (id: number) => {
  return db.prepare("SELECT * FROM Players WHERE id = ?").get(id);
};

export const listPlayers = () => {
  return db.prepare("SELECT * FROM Players").all();
};
