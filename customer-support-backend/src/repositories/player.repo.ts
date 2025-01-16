import db from "../config/database";

interface CountResult {
  count: number;
}

export const createPlayersTable = `
CREATE TABLE IF NOT EXISTS Players (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
`;

export const totalPlayersCount = (): number => {
  const result = db
    .prepare("SELECT COUNT(*) as count FROM Players")
    .get() as CountResult;
  return result.count;
};
