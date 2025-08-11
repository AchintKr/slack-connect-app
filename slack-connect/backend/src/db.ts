import Database from "better-sqlite3";
import type { Database as DatabaseType } from 'better-sqlite3';
import path from "path";

const db: DatabaseType = new Database('data.db');

db.prepare(`
  CREATE TABLE IF NOT EXISTS slack_tokens (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    team_id TEXT,
    team_name TEXT,
    access_token TEXT,
    bot_user_id TEXT
  )
`).run();

export default db;
