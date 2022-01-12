CREATE TABLE IF NOT EXISTS users (
  user_id INTEGER PRIMARY KEY,
  name	TEXT NOT NULL
)

CREATE TABLE IF NOT EXISTS accounts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL,
  password TEXT NOT NULL,
  FOREIGN KEY(user_id) REFERENCES users(user_id)
)

CREATE TABLE IF NOT EXISTS matchs (
  match_id INTEGER PRIMARY KEY,
  user_id_1 INTEGER,
  user_id_2 INTEGER,
  pokemon_user_1 TEXT,
  pokemon_user_2 TEXT,
  score_user_1   INTEGER DEFAULT 0,
  score_user_2   INTEGER DEFAULT 0,
  FOREIGN KEY(user_id_1) REFERENCES users(user_id),
  FOREIGN KEY(user_id_2) REFERENCES users(user_id)
)