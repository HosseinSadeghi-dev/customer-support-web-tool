import db from "../config/database";
import { CountResult } from "../types/db.type";

export const createSanctionsTable = `
  CREATE TABLE IF NOT EXISTS Sanctions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    player_id INTEGER NOT NULL,
    type TEXT NOT NULL,
    state TEXT CHECK(state IN ('active', 'revoked', 'expired')) NOT NULL DEFAULT 'active',
    issued_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    expires_at DATETIME,
    revoked_at DATETIME,
    FOREIGN KEY(player_id) REFERENCES Players(id)
  );
`;

export const totalPlayerSanctionsCount = (playerId: string): number => {
  const result = db
    .prepare("SELECT COUNT(*) as count FROM Sanctions WHERE player_id = ?")
    .get(playerId) as CountResult;
  return result.count;
};
