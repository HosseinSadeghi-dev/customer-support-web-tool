import db from "../config/database";
import { totalPlayerSanctionsCount } from "../repositories/sanction.repo";
import { SanctionDTO } from "../types/sanction.type";

export const addSanction = (
  playerId: string,
  type: string,
  expiresAt: string | null
) => {
  const stmt = db.prepare(`
    INSERT INTO Sanctions (player_id, type, expires_at)
    VALUES (?, ?, ?)
  `);
  const result = stmt.run(playerId, type, expiresAt);
  return result.lastInsertRowid;
};

export const revokeSanction = (id: number) => {
  db.prepare(
    'UPDATE Sanctions SET state = "revoked", revoked_at = CURRENT_TIMESTAMP WHERE id = ?'
  ).run(id);
};

export const listSanctions = (
  playerId: string,
  page: number = 0,
  pageSize: number = 10
) => {
  const offset = page * pageSize;

  const query = "SELECT * FROM Sanctions WHERE player_id = ? LIMIT ? OFFSET ?";
  const res = db.prepare(query).all(playerId, pageSize, offset);

  const totalItems = totalPlayerSanctionsCount(playerId);
  const totalPages = Math.ceil(totalItems / pageSize);

  return {
    data: res as SanctionDTO[],
    pagination: {
      totalItems,
      totalPages,
      page,
      pageSize,
    },
  };
};
