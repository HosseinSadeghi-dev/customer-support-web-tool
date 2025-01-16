export interface SanctionDTO {
  id: number;
  player_id: number;
  type: string;
  state: "active" | "revoked" | "expired";
  issued_at: string;
  expires_at?: string;
  revoked_at?: string;
}

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
