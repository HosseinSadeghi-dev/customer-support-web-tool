export interface PlayerDTO {
  id: number;
  name: string;
  created_at: string;
}

export const createPlayersTable = `
CREATE TABLE IF NOT EXISTS Players (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
`;
