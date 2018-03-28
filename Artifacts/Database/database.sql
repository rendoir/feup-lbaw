-- Tables
DROP TABLE IF EXISTS category CASCADE;
DROP TABLE IF EXISTS question_category CASCADE;
DROP TABLE IF EXISTS question CASCADE;
DROP TABLE IF EXISTS answer CASCADE;
DROP TABLE IF EXISTS commentable CASCADE;
DROP TABLE IF EXISTS comment CASCADE;
DROP TABLE IF EXISTS message CASCADE;
DROP TABLE IF EXISTS message_version CASCADE;
DROP TABLE IF EXISTS vote CASCADE;
DROP TABLE IF EXISTS "user" CASCADE;
DROP TABLE IF EXISTS moderator CASCADE;
DROP TABLE IF EXISTS notification CASCADE;
DROP TABLE IF EXISTS commentable_notification CASCADE;
DROP TABLE IF EXISTS badge_notification CASCADE;
DROP TABLE IF EXISTS badge_attainment CASCADE;
DROP TABLE IF EXISTS badge CASCADE;
DROP TABLE IF EXISTS moderator_badge CASCADE;
DROP TABLE IF EXISTS trusted_badge CASCADE;

CREATE TABLE category (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    num_posts INTEGER DEFAULT 0 NOT NULL
);

CREATE TABLE question_category (
    question_id BIGINT,
    category_id INTEGER,
    PRIMARY KEY (question_id, category_id)
);

CREATE TABLE question (
    id BIGINT PRIMARY KEY,
    title TEXT NOT NULL,
    correct_answer BIGINT UNIQUE
);

CREATE TABLE answer (
    id BIGINT PRIMARY KEY,
    question_id BIGINT NOT NULL
);

CREATE TABLE commentable (
    id BIGINT PRIMARY KEY
);

CREATE TABLE comment (
    id BIGINT PRIMARY KEY,
    commentable_id BIGINT NOT NULL
);

CREATE TABLE message (
    id BIGSERIAL PRIMARY KEY,
    creation_date TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    score INTEGER DEFAULT 0 NOT NULL,
    num_reports SMALLINT DEFAULT 0 NOT NULL,
    is_banned BOOLEAN DEFAULT FALSE,
    author BIGINT NOT NULL
);

CREATE TABLE message_version (
    id BIGSERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    message_id BIGINT,
    creation_time TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    moderator_id BIGINT NOT NULL,
);

CREATE TABLE vote (
    message_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    positive BOOLEAN NOT NULL,
    PRIMARY KEY (message_id, user_id)
);

CREATE TABLE "user" (
    id BIGSERIAL PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    biography TEXT,
    reputation SMALLINT NOT NULL
);

CREATE TABLE moderator (
    id BIGINT PRIMARY KEY
);

CREATE TABLE notification (
    id BIGSERIAL PRIMARY KEY,
    description TEXT NOT NULL,
    "date" TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    read BOOLEAN NOT NULL,
    user_id BIGINT NOT NULL
);

CREATE TABLE commentable_notification (
    id BIGINT PRIMARY KEY,
    commentable_id BIGINT NOT NULL
);

CREATE TABLE badge_notification (
    id BIGINT PRIMARY KEY,
    badge_id BIGINT NOT NULL
);

CREATE TABLE badge_attainment (
    user_id BIGINT NOT NULL,
    badge_id SMALLINT NOT NULL,
    attainment_date TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    PRIMARY KEY (user_id, badge_id)
);

CREATE TABLE badge (
    id SERIAL PRIMARY KEY,
    description TEXT NOT NULL
);

CREATE TABLE moderator_badge (
    id INTEGER PRIMARY KEY
);

CREATE TABLE trusted_badge (
    id INTEGER PRIMARY KEY
);


-- Foreign Keys
ALTER TABLE message
  ADD FOREIGN KEY (author) REFERENCES "user"(id) ON UPDATE CASCADE;

ALTER TABLE question_category
  ADD FOREIGN KEY (question_id) REFERENCES question(id) ON UPDATE CASCADE;

ALTER TABLE question_category
  ADD FOREIGN KEY (category_id) REFERENCES category(id) ON UPDATE CASCADE;

ALTER TABLE question
  ADD FOREIGN KEY (id) REFERENCES commentable(id) ON UPDATE CASCADE;

ALTER TABLE question
  ADD FOREIGN KEY (correct_answer) REFERENCES answer(id) ON UPDATE CASCADE;

ALTER TABLE answer
  ADD FOREIGN KEY (id) REFERENCES commentable(id) ON UPDATE CASCADE;

ALTER TABLE answer
  ADD FOREIGN KEY (question_id) REFERENCES question(id) ON UPDATE CASCADE;

ALTER TABLE commentable
  ADD FOREIGN KEY (id) REFERENCES message(id) ON UPDATE CASCADE;

ALTER TABLE comment
  ADD FOREIGN KEY (id) REFERENCES message(id) ON UPDATE CASCADE;

ALTER TABLE comment
  ADD FOREIGN KEY (commentable_id) REFERENCES commentable(id) ON UPDATE CASCADE;

ALTER TABLE message_version
  ADD FOREIGN KEY (message_id) REFERENCES message(id) ON UPDATE CASCADE;

ALTER TABLE message_version
  ADD FOREIGN KEY (moderator_id) REFERENCES moderator(id) ON UPDATE CASCADE;

ALTER TABLE vote
  ADD FOREIGN KEY (message_id) REFERENCES message(id) ON UPDATE CASCADE;

ALTER TABLE vote
  ADD FOREIGN KEY (user_id) REFERENCES "user"(id) ON UPDATE CASCADE;

ALTER TABLE moderator
  ADD FOREIGN KEY (id) REFERENCES "user"(id) ON UPDATE CASCADE;

ALTER TABLE notification
  ADD FOREIGN KEY (user_id) REFERENCES "user"(id) ON UPDATE CASCADE;

ALTER TABLE commentable_notification
  ADD FOREIGN KEY (id) REFERENCES notification(id) ON UPDATE CASCADE;

ALTER TABLE commentable_notification
  ADD FOREIGN KEY (id) REFERENCES commentable(id) ON UPDATE CASCADE;

ALTER TABLE badge_notification
  ADD FOREIGN KEY (id) REFERENCES notification(id) ON UPDATE CASCADE;

ALTER TABLE badge_notification
  ADD FOREIGN KEY (badge_id) REFERENCES badge(id) ON UPDATE CASCADE;

ALTER TABLE badge_attainment
  ADD FOREIGN KEY (user_id) REFERENCES "user"(id) ON UPDATE CASCADE;

ALTER TABLE badge_attainment
  ADD FOREIGN KEY (badge_id) REFERENCES badge(id) ON UPDATE CASCADE;

ALTER TABLE moderator_badge
  ADD FOREIGN KEY (id) REFERENCES badge(id) ON UPDATE CASCADE;

ALTER TABLE trusted_badge
  ADD FOREIGN KEY (id) REFERENCES badge(id) ON UPDATE CASCADE;
