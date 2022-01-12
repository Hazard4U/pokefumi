import Database from "better-sqlite3";
import fs from "fs";
import migrations from "../../db/migrations/migrations.json";
import { Match } from "../models/Match";

export default class MatchRepository {
  db: Database.Database;

  constructor() {
    this.db = new Database("db/matchs.db", { verbose: console.log });
    this.applyMigrations();
  }

  applyMigrations() {
    const applyMigration = (path: string) => {
      const migration = fs.readFileSync(path, "utf8");
      this.db.exec(migration);
    };

    const testRow = this.db
      .prepare(
        "SELECT name FROM sqlite_schema WHERE type = 'table' AND name = 'matchs'"
      )
      .get();

    if (!testRow) {
      console.log("Applying migrations on DB matchs...");
      migrations.forEach(applyMigration);
    }
  }

  getAllMatchs(): Match[] {
    const statement = this.db.prepare("SELECT * FROM matchs");
    return statement.all();
  }

  getMatchById(matchId: number): Match {
    const statement = this.db.prepare("SELECT * FROM matchs WHERE match_id = ?");
    return statement.get(matchId);
  }

  createMatch(userId1: number) {
    const statement = this.db.prepare("INSERT INTO matchs (user_id_1) VALUES (?)");
    return statement.run(userId1).lastInsertRowid;
  }
}
