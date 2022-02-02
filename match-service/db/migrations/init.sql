CREATE TABLE IF NOT EXISTS users (
  user_id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  score INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS matchs (
  match_id INTEGER PRIMARY KEY,
  user_id_1 INTEGER NOT NULL,
  user_id_2 INTEGER,
  pokemons_user_1 TEXT,
  pokemons_user_2 TEXT,
  score_user_1 INTEGER DEFAULT 0,
  score_user_2 INTEGER DEFAULT 0,
  round_id INTEGER,
  FOREIGN KEY(user_id_1) REFERENCES users(user_id),
  FOREIGN KEY(user_id_2) REFERENCES users(user_id),
  FOREIGN KEY(round_id) REFERENCES rounds(round_id)
);

CREATE TABLE IF NOT EXISTS rounds (
  round_id INTEGER PRIMARY KEY,
  match_id INTEGER NOT NULL,
  round_in_match INTEGER NOT NULL,
  pokemon_user_1 INTEGER,
  pokemon_user_2 INTEGER,
  resultat INTEGER,
  FOREIGN KEY(match_id) REFERENCES matchs(match_id)
);