CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE habits (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT fk_user
    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE
);
CREATE TABLE habit_completions (
  id UUID PRIMARY KEY,
  habit_id UUID NOT NULL,
  completed_on DATE NOT NULL,

  CONSTRAINT fk_habit
    FOREIGN KEY (habit_id)
    REFERENCES habits(id)
    ON DELETE CASCADE,

  CONSTRAINT unique_habit_day
    UNIQUE (habit_id, completed_on)
);
