DROP TABLE IF EXISTS "user" CASCADE;
DROP TABLE IF EXISTS moderator CASCADE;
DROP TABLE IF EXISTS message CASCADE;
DROP TABLE IF EXISTS commentable CASCADE;
DROP TABLE IF EXISTS question CASCADE;
DROP TABLE IF EXISTS answer CASCADE;
DROP TABLE IF EXISTS category CASCADE;
DROP TABLE IF EXISTS question_category CASCADE;
DROP TABLE IF EXISTS comment CASCADE;
DROP TABLE IF EXISTS message_version CASCADE;
DROP TABLE IF EXISTS vote CASCADE;
DROP TABLE IF EXISTS badge CASCADE;
DROP TABLE IF EXISTS moderator_badge CASCADE;
DROP TABLE IF EXISTS trusted_badge CASCADE;
DROP TABLE IF EXISTS notification CASCADE;
DROP TABLE IF EXISTS commentable_notification CASCADE;
DROP TABLE IF EXISTS badge_notification CASCADE;
DROP TABLE IF EXISTS badge_attainment CASCADE;

CREATE TABLE "user" (
    id BIGSERIAL PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    biography TEXT,
    reputation SMALLINT NOT NULL
);

CREATE TABLE moderator (
    id BIGINT PRIMARY KEY REFERENCES "user"(id)
);

CREATE TABLE message (
    id BIGSERIAL PRIMARY KEY,
    creation_date TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    score INTEGER DEFAULT 0 NOT NULL,
    num_reports SMALLINT DEFAULT 0 NOT NULL,
    is_banned BOOLEAN DEFAULT FALSE,
    author BIGINT NOT NULL REFERENCES "user"(id)
);

CREATE TABLE commentable (
    id BIGINT PRIMARY KEY REFERENCES message(id)
);

CREATE TABLE question (
    id BIGINT PRIMARY KEY REFERENCES commentable(id),
    title TEXT NOT NULL,
    correct_answer BIGINT UNIQUE
);

CREATE TABLE answer (
    id BIGINT PRIMARY KEY REFERENCES commentable(id),
    question_id BIGINT NOT NULL REFERENCES question(id)
);

CREATE TABLE category (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    num_posts INTEGER DEFAULT 0 NOT NULL
);

CREATE TABLE question_category (
    question_id BIGINT REFERENCES question(id),
    category_id INTEGER REFERENCES category(id),
    PRIMARY KEY (question_id, category_id)
);

CREATE TABLE comment (
    id BIGINT PRIMARY KEY REFERENCES message(id),
    commentable_id BIGINT NOT NULL REFERENCES commentable(id)
);

CREATE TABLE message_version (
    id BIGSERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    message_id BIGINT NOT NULL REFERENCES message(id),
    creation_time TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    moderator_id BIGINT REFERENCES moderator(id)
);

CREATE TABLE vote (
    message_id BIGINT NOT NULL REFERENCES message(id),
    user_id BIGINT NOT NULL REFERENCES "user"(id),
    positive BOOLEAN NOT NULL,
    PRIMARY KEY (message_id, user_id)
);

CREATE TABLE badge (
    id SERIAL PRIMARY KEY,
    description TEXT NOT NULL
);

CREATE TABLE moderator_badge (
    id INTEGER PRIMARY KEY REFERENCES badge(id)
);

CREATE TABLE trusted_badge (
    id INTEGER PRIMARY KEY REFERENCES badge(id)
);

CREATE TABLE notification (
    id BIGSERIAL PRIMARY KEY,
    description TEXT NOT NULL,
    "date" TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    read BOOLEAN NOT NULL,
    user_id BIGINT NOT NULL REFERENCES "user"(id)
);

CREATE TABLE commentable_notification (
    id BIGINT PRIMARY KEY REFERENCES notification(id),
    commentable_id BIGINT NOT NULL REFERENCES commentable(id)
);

CREATE TABLE badge_notification (
    id BIGINT PRIMARY KEY REFERENCES notification(id),
    badge_id BIGINT NOT NULL REFERENCES badge(id)
);

CREATE TABLE badge_attainment (
    user_id BIGINT NOT NULL REFERENCES "user"(id),
    badge_id SMALLINT NOT NULL REFERENCES badge(id),
    attainment_date TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    PRIMARY KEY (user_id, badge_id)
);

ALTER TABLE question
  ADD FOREIGN KEY (correct_answer) REFERENCES answer(id) ON UPDATE CASCADE;
