import Database from "better-sqlite3";
import fs from "fs";
import migrations from "../../db/migrations/migrations.json";
import { User, UserMapper } from "../models/User";

export default class UserRepository {
  db: Database.Database;

  constructor() {
    this.db = new Database("db/users.db", { verbose: console.log });
    this.applyMigrations();
  }

  applyMigrations() {
    const applyMigration = (path: string) => {
      const migration = fs.readFileSync(path, "utf8");
      this.db.exec(migration);
    };

    const testRow = this.db
      .prepare(
        "SELECT name FROM sqlite_schema WHERE type = 'table' AND name = 'users'"
      )
      .get();

    if (!testRow) {
      console.log("Applying migrations on DB users...");
      migrations.forEach(applyMigration);
    }
  
  }

  getAllUsers(): User[] {
    const statement = this.db.prepare("SELECT * FROM users");
    return statement.all().map((user) => UserMapper(user));
  }

  getUserById(userId: number): User {
    const statement = this.db.prepare("SELECT * FROM users WHERE user_id = ?");
    return UserMapper(statement.get(userId));
  }

  createUser(name: string) {
    const statement = this.db.prepare("INSERT INTO users (name) VALUES (?)");
    return statement.run(name).lastInsertRowid;
  }
}
