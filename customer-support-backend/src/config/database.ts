import Database from "better-sqlite3";
import path from "path";
import { createPlayersTable } from "../repositories/player.repo";
import { createTagsTable } from "../repositories/tag.repo";
import { createPlayerTagsTable } from "../repositories/playerTag.repo";
import { createSanctionsTable } from "../repositories/sanction.repo";
import { logger } from "./logger";

const dbPath = path.resolve(__dirname, "../../database.sqlite");
const db = new Database(dbPath);

const initializeDatabase = () => {
  try {
    logger.info("Initializing database...");
    db.exec(createPlayersTable);
    logger.info("Players table created successfully.");

    db.exec(createTagsTable);
    logger.info("Tags table created successfully.");

    db.exec(createPlayerTagsTable);
    logger.info("PlayerTags table created successfully.");

    db.exec(createSanctionsTable);
    logger.info("Sanctions table created successfully.");
  } catch (error) {
    logger.error("Error initializing database: ", error);
  }
};

initializeDatabase();

export default db;
