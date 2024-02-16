const fs = require("fs");
const Database = require("better-sqlite3");
const path = require("node:path");

//Windows
//C:/Users/hp/Desktop/MIMOZA_ELECTRON/Mimoza-Electron/mimoza.db
//C:/Users/hp/Desktop/MIMOZA_ELECTRON/Mimoza-Electron/migration/migration.sql
//Linux
// /home/adam/Desktop/CurrentProjects/Mimoza-Electron/models/migration/migration.sql
// /home/adam/Desktop/CurrentProjects/Mimoza-Electron/models/db/mimoza.db
const DB_PATH = "C:/Users/hp/Desktop/MIMOZA_ELECTRON/Mimoza-Electron/mimoza.db";
const MIGRATIONS_DIR =
  "C:/Users/hp/Desktop/MIMOZA_ELECTRON/Mimoza-Electron/models/migration/migration.sql";
// Function to apply migrations
function applyMigrations() {
  const db = new Database(DB_PATH, { verbose: console.log });
  const migration = fs.readFileSync(MIGRATIONS_DIR, "utf8");
  db.exec(migration);
  db.pragma("journal_mode = WAL");
  db.pragma("foreign_keys = ON");
  db.pragma("cache_size = 10000");
  db.pragma("temp_store = MEMORY");
  db.pragma("auto_vacuum = FULL");
  exports.db = db;
}

applyMigrations();
