import db from "../config/database";
import { addTag } from "../repositories/tag.repo";
import { addPlayerTag } from "../repositories/playerTag.repo";
import { PlayerDTO } from "../repositories/player.repo";

type PlayersListResponse = PlayerDTO & { tags: string[] };

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

export const listPlayers = (): PlayersListResponse[] => {
  return db
    .prepare(
      `
    SELECT Players.id, Players.name, GROUP_CONCAT(Tags.name) AS tags
    FROM Players
    LEFT JOIN PlayerTags ON Players.id = PlayerTags.player_id
    LEFT JOIN Tags ON PlayerTags.tag_id = Tags.id
    GROUP BY Players.id
  `
    )
    .all() as PlayersListResponse[];
};