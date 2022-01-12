import Database from "better-sqlite3";
import fs from "fs";
import { Account } from "../models/Accout";
import migrations from "../../db/migrations/migrations.json";

export default class AccountRepository {
    db: Database.Database;

  constructor() {
    this.db = new Database("db/accounts.db", { verbose: console.log });
    this.applyMigrations();
  }

  applyMigrations() {
    const applyMigration = (path: string) => {
      const migration = fs.readFileSync(path, "utf8");
      this.db.exec(migration);
    };

    const testRow = this.db
      .prepare(
        "SELECT name FROM sqlite_schema WHERE type = 'table' AND name = 'accounts'"
      )
      .get();

    if (!testRow) {
      console.log("Applying migrations on DB accounts...");
      migrations.forEach(applyMigration);
    }
  
  }

  connection(username: string, password: string): Account {
    const statement = this.db.prepare("SELECT * FROM accounts WHERE username = ? AND password = ?");
    return statement.get(username, password);
  }
}