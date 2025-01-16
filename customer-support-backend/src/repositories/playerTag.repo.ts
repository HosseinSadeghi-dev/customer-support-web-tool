import db from "../config/database";

export interface PlayerTagDTO {
  player_id: number;
  tag_id: number;
}

export const createPlayerTagsTable = `
CREATE TABLE IF NOT EXISTS PlayerTags (
  player_id INTEGER NOT NULL,
  tag_id INTEGER NOT NULL,
  FOREIGN KEY(player_id) REFERENCES Players(id),
  FOREIGN KEY(tag_id) REFERENCES Tags(id),
  PRIMARY KEY(player_id, tag_id)
);
`;

export const addPlayerTag = (playerId: number, tagId: number): PlayerTagDTO => {
  const stmt = db.prepare(
    "INSERT INTO PlayerTags (player_id, tag_id) VALUES (?, ?)"
  );
  stmt.run(playerId, tagId);
  return { player_id: playerId, tag_id: tagId };
};
