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
    const rows: Match[] = statement.all();
    return rows;
  }

  getMatchById(matchId: number): Match {
    const statement = this.db.prepare("SELECT * FROM matchs WHERE match_id = ?");
    const rows: Match[] = statement.get(matchId);
    if(rows.length > 1){
        throw new Error("More than one match with the same Id !");
    }
    return rows[0];
  }

  createMatch(userId1: number) {
    const statement = this.db.prepare("INSERT INTO matchs (user_id_1) VALUES (?)");
    return statement.run(userId1).lastInsertRowid;
  }
}
