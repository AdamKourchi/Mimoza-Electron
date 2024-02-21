const fs = require("fs");
const Database = require("better-sqlite3");
const path = require("path");

const DB_PATH = "mimoza.db";
const MIGRATIONS_DIR = path.resolve(__dirname, "migration/migration.sql");

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
  console.log("DB", db);
  exports.db = db;
}

applyMigrations();
