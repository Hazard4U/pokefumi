CREATE TABLE IF NOT EXISTS users (
  user_id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  score INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS accounts (
  username TEXT PRIMARY KEY,
  password TEXT NOT NULL,
  user_id INTEGER,
  FOREIGN KEY(user_id) REFERENCES users(user_id)
);

INSERT INTO users (user_id, name) VALUES (1, 'Hazard4U');
INSERT INTO users (user_id, name) VALUES (2, 'OnyX');

INSERT INTO accounts (username, password, user_id) VALUES ('theo', 'theo', 1);
INSERT INTO accounts (username, password, user_id) VALUES ('louis', 'louis', 2);

CREATE TABLE IF NOT EXISTS matchs (
  match_id INTEGER PRIMARY KEY,
  user_id_1 INTEGER NOT NULL,
  user_id_2 INTEGER,
  pokemon_user_1 TEXT,
  pokemon_user_2 TEXT,
  score_user_1 INTEGER DEFAULT 0,
  score_user_2 INTEGER DEFAULT 0,
  FOREIGN KEY(user_id_1) REFERENCES users(user_id),
  FOREIGN KEY(user_id_2) REFERENCES users(user_id)
);