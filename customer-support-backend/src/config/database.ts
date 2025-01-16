import Database from "better-sqlite3";
import path from "path";
import { createPlayersTable } from "../repositories/player.repo";
import { createTagsTable } from "../repositories/tag.repo";
import { createPlayerTagsTable } from "../repositories/playerTag.repo";
import { createSanctionsTable } from "../repositories/sanction.repo";

const dbPath = path.resolve(__dirname, "../../database.sqlite");
const db = new Database(dbPath);

const initializeDatabase = () => {
  db.exec(createPlayersTable);
  db.exec(createTagsTable);
  db.exec(createPlayerTagsTable);
  db.exec(createSanctionsTable);
};

initializeDatabase();

export default db;
