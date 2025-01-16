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
