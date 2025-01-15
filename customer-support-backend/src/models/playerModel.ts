import db from '../config/database';

export const createPlayer = (name: string, tag: string) => {
  const stmt = db.prepare('INSERT INTO Players (name, tag) VALUES (?, ?)');
  const result = stmt.run(name, tag);
  return result.lastInsertRowid;
};

export const getPlayerById = (id: number) => {
  return db.prepare('SELECT * FROM Players WHERE id = ?').get(id);
};

export const listPlayers = () => {
  return db.prepare('SELECT * FROM Players').all();
};
