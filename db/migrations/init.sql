CREATE TABLE IF NOT EXISTS users (
  user_id INTEGER PRIMARY KEY,
  name	TEXT NOT NULL,
  score   INTEGER DEFAULT 0
)

CREATE TABLE IF NOT EXISTS matchs (
  match_id INTEGER PRIMARY KEY,
  user_id_1 INTEGER,
  user_id_2 INTEGER,
  pokemon_id_1 TEXT,
  pokemon_id_2 TEXT,
  FOREIGN KEY(user_id_1) REFERENCES users(user_id),
  FOREIGN KEY(user_id_2) REFERENCES users(user_id)
)