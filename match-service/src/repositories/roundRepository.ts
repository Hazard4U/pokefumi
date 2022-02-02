import Database from "better-sqlite3";
import fs from "fs";
import DatabaseFactory from "../factories/databaseFactory";
import migrations from "../../db/migrations/migrations.json";
import { Round, RoundMapper} from "../models/Round";

export default class RoundRepository {
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
        "SELECT name FROM sqlite_schema WHERE type = 'table' AND name = 'rounds'"
      )
      .get();

    if (!testRow) {
      console.log("Applying migrations on DB rounds...");
      migrations.forEach(applyMigration);
    }
  }

  getAllRounds(): Round[] {
    const statement = this.db.prepare("SELECT * FROM rounds");
    return statement.all().map((round) => RoundMapper(round));
  }

  getRoundById(roundId: number): Round {
    const statement = this.db.prepare(
      "SELECT * FROM rounds WHERE round_id = ?"
    );
    return RoundMapper(statement.get(roundId));
  }

  getRoundsByMatchId(matchId: number): Round[] {
    const statement = this.db.prepare(
      "SELECT * FROM rounds WHERE match_id = ?"
    );
    return statement.all(matchId).map((round) => RoundMapper(round));;
  }

  createRound(matchId: number, roundInMatch: number) {
    const statement = this.db.prepare(
      "INSERT INTO rounds (match_id, round_in_match) VALUES (?,?)"
    );
    return statement.run(matchId, roundInMatch).lastInsertRowid;
  }

  getPokemonUser1(roundId: number): number {
    const statement = this.db.prepare(
      "SELECT pokemon_user_1 FROM rounds WHERE round_id = ?"
    );
    return statement.get(roundId);
  }

  getPokemonUser2(roundId: number): number {
    const statement = this.db.prepare(
      "SELECT pokemon_user_2 FROM rounds WHERE round_id = ?"
    );
    return statement.get(roundId);
  }

  updatePokemonUser1(roundId: number, pokemonUser1: number) {
    const statement = this.db.prepare(
      "UPDATE rounds SET pokemon_user_1 = ? WHERE round_id = ?"
    );
    statement.run(roundId, pokemonUser1);
  }

  updatePokemonUser2(roundId: number, pokemonUser2: number) {
    const statement = this.db.prepare(
      "UPDATE rounds SET pokemon_user_2 = ? WHERE round_id = ?"
    );
    statement.run(roundId, pokemonUser2);
  }
}
