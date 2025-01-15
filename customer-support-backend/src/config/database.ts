import Database from 'better-sqlite3';

const db = new Database('database.sqlite', { verbose: console.log });

db.exec(`
  CREATE TABLE IF NOT EXISTS Players (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    tag TEXT NOT NULL UNIQUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

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
`);

export default db;