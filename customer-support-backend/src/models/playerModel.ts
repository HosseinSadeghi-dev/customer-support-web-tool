import db from "../config/database";
import { TagDTO } from "../repositories/tag.repo";

export const createPlayer = (name: string, tagNames: string[]) => {
  const stmt = db.prepare("INSERT INTO Players (name) VALUES (?)");
  const result = stmt.run(name);
  const playerId = result.lastInsertRowid;

  const tagStmt = db.prepare(
    "INSERT INTO Tags (name) VALUES (?) ON CONFLICT(name) DO NOTHING"
  );
  const playerTagStmt = db.prepare(
    "INSERT INTO PlayerTags (player_id, tag_id) VALUES (?, ?)"
  );

  tagNames.forEach((tagName: string) => {
    tagStmt.run(tagName);
    const tagResult = db
      .prepare<Partial<TagDTO>, TagDTO>("SELECT id FROM Tags WHERE name = ?")
      .get({ name: tagName });

    // Check if the tag exists
    if (!tagResult) {
      throw new Error(`Tag "${tagName}" does not exist.`);
    }

    const tagId = tagResult.id;
    playerTagStmt.run(playerId, tagId);
  });

  return playerId;
};

export const getPlayerById = (id: number) => {
  return db.prepare("SELECT * FROM Players WHERE id = ?").get(id);
};

export const listPlayers = () => {
  return db.prepare("SELECT * FROM Players").all();
};
