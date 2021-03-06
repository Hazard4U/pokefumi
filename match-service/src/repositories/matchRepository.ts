import Database from "better-sqlite3";
import fs from "fs";
import migrations from "../../db/migrations/migrations.json";
import { Match, MatchMapper } from "../models/Match";
import DatabaseFactory from "../factories/databaseFactory";

export default class MatchRepository {
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
    return statement.all().map((match) => MatchMapper(match));
  }

  getMatchById(matchId: number): Match {
    const statement = this.db.prepare(
      "SELECT * FROM matchs WHERE match_id = ?"
    );
    return MatchMapper(statement.get(matchId));
  }

  getMatchsByUserId(userId: number): Match[] {
    const statement = this.db.prepare(
      "SELECT * FROM matchs WHERE user_id_1 = ? OR user_id_2 = ?"
    );
    return statement.all(userId, userId).map((match) => MatchMapper(match));
  }

  createMatch(userId1: number) {
    const statement = this.db.prepare(
      "INSERT INTO matchs (user_id_1) VALUES (?)"
    );
    return statement.run(userId1).lastInsertRowid;
  }

  deleteMatchById(matchId: number) {
    const statement = this.db.prepare("DELETE FROM matchs WHERE match_id = ?")
    return statement.run(matchId)
  }

  updateUser2(matchId: number, userId2: number) {
    const statement = this.db.prepare(
      "UPDATE matchs SET user_id_2 = ? WHERE match_id = ?"
    );
    statement.run(userId2, matchId);
  }

  updateRound(matchId: number, roundId: number) {
    const statement = this.db.prepare(
      "UPDATE matchs SET round_id = ? WHERE match_id = ?"
    );
    statement.run(roundId, matchId);
  }

  updatePokemonsUser1(matchId: number, pokemonsUser1: string) {
    const statement = this.db.prepare(
      "UPDATE matchs SET pokemons_user_1 = ? WHERE match_id = ?"
    );
    statement.run(pokemonsUser1, matchId);
  }

  updatePokemonsUser2(matchId: number, pokemonsUser2: string) {
    const statement = this.db.prepare(
      "UPDATE matchs SET pokemons_user_2 = ? WHERE match_id = ?"
    );
    statement.run(pokemonsUser2, matchId);
  }

  updateScoreUser1(matchId: number, score: number) {
    const statement = this.db.prepare(
      "UPDATE matchs SET score_user_1 = ? WHERE match_id = ?"
    );
    statement.run(score, matchId);
  }

  updateScoreUser2(matchId: number, score: string) {
    const statement = this.db.prepare(
      "UPDATE matchs SET score_user_2 = ? WHERE match_id = ?"
    );
    statement.run(score, matchId);
  }
}
