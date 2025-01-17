import db from "../config/database";
import { addTag } from "../repositories/tag.repo";
import { addPlayerTag } from "../repositories/playerTag.repo";
import { totalPlayersCount } from "../repositories/player.repo";
import { PaginationResponse } from "../types/pagination.type";
import { PlayersListResponse } from "../types/player.type";
import { SanctionState } from "../types/sanction.type";

const playerlistMapper = (
  players: PlayersListResponse[]
): PlayersListResponse[] => {
  return players.map((player) => ({
    ...player,
    isVip: !!player.isVip,
    tags: player.tags ? (player.tags as string).split(",") : [],
  }));
};

export const createPlayer = (
  name: string,
  tagNames: string[],
  isVip?: boolean,
  email?: string,
  discordUsername?: string
) => {
  const stmt = db.prepare(`
    INSERT INTO Players (name, is_vip, email, discord_username) 
    VALUES (?, ?, ?, ?)
    `);
  const result = stmt.run(name, isVip ? 1 : 0, email, discordUsername);
  const playerId = result.lastInsertRowid as number;
  tagNames.forEach((tagName: string) => {
    const tagResult = addTag(tagName);
    addPlayerTag(playerId, tagResult.id);
  });
  return playerId;
};

export const editPlayer = (
  id: number,
  name: string,
  tagNames: string[],
  isVip?: boolean,
  email?: string,
  discordUsername?: string
) => {
  const stmt = db.prepare(`
    UPDATE Players 
    SET name = ?, is_vip = ?, email = ?, discord_username = ? 
    WHERE id = ?
  `);
  stmt.run(name, isVip ? 1 : 0, email, discordUsername, id);

  const deleteStmt = db.prepare(`
    DELETE FROM PlayerTags WHERE player_id = ?
  `);
  deleteStmt.run(id);

  tagNames.forEach((tagName: string) => {
    const tagResult = addTag(tagName);
    addPlayerTag(id, tagResult.id);
  });
};

export const getPlayerById = (id: string): PlayersListResponse => {
  const query = `
    SELECT Players.id, Players.name, GROUP_CONCAT(Tags.name) AS tags
    FROM Players
    LEFT JOIN PlayerTags ON Players.id = PlayerTags.player_id
    LEFT JOIN Tags ON PlayerTags.tag_id = Tags.id
    WHERE Players.id = ?
    GROUP BY Players.id
  `;

  const res = db.prepare(query).get(id) as PlayersListResponse;
  return {
    ...res,
    tags: res.tags ? (res.tags as string).split(",") : [],
  };
};

export const listPlayers = (
  tagName?: string,
  page: number = 0,
  pageSize: number = 10
): PaginationResponse<PlayersListResponse> => {
  const offset = page * pageSize;
  const query = `
    SELECT
     Players.id, 
    Players.name,
    Players.email,
     Players.discord_username AS discordUsername,
      CASE WHEN Players.is_vip = 1 THEN TRUE ELSE FALSE END AS isVip, 
      GROUP_CONCAT(DISTINCT Tags.name) AS tags, 
      GROUP_CONCAT(DISTINCT Sanctions.type) AS activeSanction
    FROM Players
    LEFT JOIN PlayerTags ON Players.id = PlayerTags.player_id
    LEFT JOIN Tags ON PlayerTags.tag_id = Tags.id
    LEFT JOIN Sanctions ON Players.id = Sanctions.player_id AND Sanctions.state = ?
    ${tagName ? "WHERE Tags.name LIKE ?" : ""}
    GROUP BY Players.id
    ORDER BY Players.created_at DESC
    LIMIT ? OFFSET ?
  `;
  const res = tagName
    ? db
        .prepare(query)
        .all(`%${tagName}%`, SanctionState.Active, pageSize, offset)
    : db.prepare(query).all(SanctionState.Active, pageSize, offset);

  const totalItems = totalPlayersCount();
  const totalPages = Math.ceil(totalItems / pageSize);

  return {
    data: playerlistMapper(res as PlayersListResponse[]),
    pagination: {
      totalItems,
      totalPages,
      page,
      pageSize,
    },
  };
};
