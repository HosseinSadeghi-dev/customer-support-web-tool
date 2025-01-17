import db from "../config/database";
import { CountResult } from "../types/db.type";

export const createPlayersTable = `
CREATE TABLE IF NOT EXISTS Players (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  is_vip BOOLEAN DEFAULT FALSE NOT NULL,
  email TEXT UNIQUE DEFAULT NULL,
  discord_username TEXT UNIQUE DEFAULT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
`;

export const totalPlayersCount = (): number => {
  const result = db
    .prepare("SELECT COUNT(*) as count FROM Players")
    .get() as CountResult;
  return result.count;
};
