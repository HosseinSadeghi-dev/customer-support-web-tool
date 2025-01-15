import db from '../config/database';

export const addSanction = (playerId: number, type: string, expiresAt: string | null) => {
  const stmt = db.prepare(`
    INSERT INTO Sanctions (player_id, type, expires_at)
    VALUES (?, ?, ?)
  `);
  const result = stmt.run(playerId, type, expiresAt);
  return result.lastInsertRowid;
};

export const revokeSanction = (id: number) => {
  db.prepare('UPDATE Sanctions SET state = "revoked", revoked_at = CURRENT_TIMESTAMP WHERE id = ?').run(id);
};

export const listSanctions = (playerId: number) => {
  return db.prepare('SELECT * FROM Sanctions WHERE player_id = ?').all(playerId);
};
