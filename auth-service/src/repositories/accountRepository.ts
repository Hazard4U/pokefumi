import Database from "better-sqlite3";
import DatabaseFactory from "../factories/databaseFactory";
import fs from "fs";
import { Account, AccountMapper, AccountWithPassword, AccountWithPasswordMapper } from "../models/Accout";
import migrations from "../../db/migrations/migrations.json";

export default class AccountRepository {
    db: Database.Database;

  constructor() {
    this.db = DatabaseFactory.getInstance();
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

  getAllAccounts(): Account[] {
    const statement = this.db.prepare("SELECT * from accounts");
    return statement.all().map((account) => AccountMapper(account))
  }

  getAccountByUsername(username: string): Account {
    const statement = this.db.prepare("SELECT * FROM accounts WHERE username = ?");
    return AccountMapper(statement.get(username));
  }

  getAccountWithPasswordByUsername(username: string): AccountWithPassword {
    const statement = this.db.prepare("SELECT * FROM accounts WHERE username = ?");
    return AccountWithPasswordMapper(statement.get(username));
  }

  getAccountByRowId(rowId: number | bigint): Account {
    const statement = this.db.prepare("SELECT * FROM accounts WHERE rowid = ?");
    return AccountMapper(statement.get(rowId));
  }

  signup(username: string, password: string): number | bigint {
    const statement = this.db.prepare("INSERT INTO accounts (username, password) VALUES (?, ?)");
    return statement.run(username, password).lastInsertRowid; 
  }
}