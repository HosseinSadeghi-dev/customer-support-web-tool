import db from "../config/database";

export interface TagDTO {
  id: number;
  name: string;
}

export const createTagsTable = `
  CREATE TABLE IF NOT EXISTS Tags (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE
  );
`;

export const addTag = (name: string): TagDTO => {
  const stmt = db.prepare("INSERT INTO Tags (name) VALUES (?)");
  const info = stmt.run(name);
  return { id: Number(info.lastInsertRowid), name };
};

export const tagExists = (name: string): boolean => {
  const stmt = db.prepare("SELECT COUNT(*) AS count FROM Tags WHERE name = ?");
  const row = stmt.get(name) as { count: number };
  return row.count > 0;
};
