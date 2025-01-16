import db from "../config/database";
import { addTag } from "../repositories/tag.repo";
import { addPlayerTag } from "../repositories/playerTag.repo";
import { totalPlayersCount } from "../repositories/player.repo";
import { PaginationResponse } from "../types/pagination.type";
import { PlayersListResponse } from "../types/player.type";

const playerlistMapper = (
  players: PlayersListResponse[]
): PlayersListResponse[] => {
  return players.map((player) => ({
    ...player,
    tags: player.tags ? (player.tags as string).split(",") : [],
  }));
};

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
    SELECT Players.id, Players.name, GROUP_CONCAT(Tags.name) AS tags
    FROM Players
    LEFT JOIN PlayerTags ON Players.id = PlayerTags.player_id
    LEFT JOIN Tags ON PlayerTags.tag_id = Tags.id
    ${tagName ? "WHERE Tags.name LIKE ?" : ""}
    GROUP BY Players.id
    LIMIT ? OFFSET ?
  `;
  const res = tagName
    ? db.prepare(query).all(`%${tagName}%`, pageSize, offset)
    : db.prepare(query).all(pageSize, offset);

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
