import db from "../config/database";
import { totalPlayerSanctionsCount } from "../repositories/sanction.repo";
import { SanctionDTO, SanctionState } from "../types/sanction.type";

const setSanctionState = (sanction: SanctionDTO): SanctionDTO => {
  if (sanction.revoked_at) {
    return {
      ...sanction,
      state: SanctionState.Revoked,
    };
  }
  if (sanction.expires_at && new Date(sanction.expires_at) < new Date()) {
    return {
      ...sanction,
      state: SanctionState.Expired,
    };
  }
  return {
    ...sanction,
    state: SanctionState.Active,
  };
};

const updateSanctionsState = (): void => {
  const sanctions = db
    .prepare(
      `
      SELECT * FROM Sanctions
      WHERE state = 'active'
      `
    )
    .all() as SanctionDTO[];

  const stmt = db.prepare(`
    UPDATE Sanctions 
    SET state = ? 
    WHERE id = ?
  `);

  sanctions.forEach((sanction) => {
    const updatedSanction = setSanctionState(sanction);
    stmt.run(updatedSanction.state, sanction.id);
  });
};

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
  updateSanctionsState();
  return result.lastInsertRowid;
};

export const revokeSanction = (id: number) => {
  db.prepare(
    'UPDATE Sanctions SET state = "revoked", revoked_at = CURRENT_TIMESTAMP WHERE id = ?'
  ).run(id);
  updateSanctionsState();
};

export const listSanctions = (
  playerId: string,
  page: number = 0,
  pageSize: number = 10
) => {
  updateSanctionsState();
  const offset = page * pageSize;

  const query = "SELECT * FROM Sanctions WHERE player_id = ? LIMIT ? OFFSET ?";
  const res = db
    .prepare(query)
    .all(playerId, pageSize, offset) as SanctionDTO[];

  const totalItems = totalPlayerSanctionsCount(playerId);
  const totalPages = Math.ceil(totalItems / pageSize);

  return {
    data: res,
    pagination: {
      totalItems,
      totalPages,
      page,
      pageSize,
    },
  };
};
