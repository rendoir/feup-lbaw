-- SCHEMA: public

DROP SCHEMA public CASCADE;

CREATE SCHEMA public
    AUTHORIZATION postgres;
	
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
    reputation REAL NOT NULL DEFAULT 0.0
);

CREATE TABLE moderator (
    id BIGINT PRIMARY KEY REFERENCES "user"(id)
);

CREATE TABLE message (
    id BIGSERIAL PRIMARY KEY,
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
    creation_time TIMESTAMP NOT NULL DEFAULT now(),
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

-- A message is banned when it exceeds the report limits
CREATE FUNCTION ban_message() RETURNS TRIGGER AS $$
  BEGIN
    UPDATE message
      SET is_banned = TRUE
      WHERE NEW.id = message.id;
    RETURN NEW;
  END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER ban_message
  AFTER UPDATE OF num_reports ON message
  FOR EACH ROW
    WHEN ( NEW.num_reports >= 5 + NEW.score^(1/3) )
      EXECUTE PROCEDURE ban_message();


-- Check if the correct answer is an answer to that question
CREATE FUNCTION check_correct() RETURNS TRIGGER AS $$
  BEGIN
    IF NEW.correct_answer IS NOT NULL AND
      NOT EXISTS (SELECT * FROM answer WHERE NEW.correct_answer = id AND NEW.id = question_id) THEN
        RAISE EXCEPTION 'An answer can only be marked as correct if it is an answer of the question';
    END IF;
    RETURN NEW;
  END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_correct
  BEFORE UPDATE OF correct_answer ON question
  FOR EACH ROW EXECUTE PROCEDURE check_correct();


-- Ensure questions have one to five categories
CREATE FUNCTION check_categories() RETURNS TRIGGER AS $$
  DECLARE num_categories SMALLINT;
  DECLARE current RECORD;
  BEGIN
      IF TG_OP = 'INSERT' THEN
        current = NEW;
      ELSE
        current = OLD;
      END IF;
      SELECT INTO num_categories count(*)
      FROM question_category
      WHERE current.question_id = question_category.question_id;
    IF num_categories > 5 THEN
      RAISE EXCEPTION 'A question can only have a maximum of 5 categories';
    ELSIF num_categories < 1 THEN
      RAISE EXCEPTION 'A question must have at least 1 category';
    END IF;
    RETURN NEW;
  END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_categories
  AFTER INSERT OR DELETE ON question_category
  FOR EACH ROW EXECUTE PROCEDURE check_categories();


-- Ensure number of posts per category is always updated
CREATE FUNCTION insert_category() RETURNS TRIGGER AS $$
  BEGIN
    UPDATE category
      SET num_posts = num_posts + 1
      WHERE NEW.category_id = category.id;
    RETURN NEW;
  END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER insert_category
  AFTER INSERT ON question_category
  FOR EACH ROW EXECUTE PROCEDURE insert_category();


CREATE FUNCTION delete_category() RETURNS TRIGGER AS $$
  BEGIN
    UPDATE category
      SET num_posts = num_posts - 1
      WHERE OLD.category_id = category.id;
    RETURN NEW;
  END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER delete_category
  AFTER DELETE ON question_category
  FOR EACH ROW EXECUTE PROCEDURE delete_category();


CREATE FUNCTION update_category() RETURNS TRIGGER AS $$
  BEGIN
    UPDATE category
      SET num_posts = num_posts - 1
      WHERE OLD.category_id = category.id;
    UPDATE category
      SET num_posts = num_posts + 1
      WHERE NEW.category_id = category.id;
    RETURN NEW;
  END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_category
  AFTER UPDATE ON question_category
  FOR EACH ROW EXECUTE PROCEDURE update_category();


-- Update score on vote changes
CREATE FUNCTION update_score_vote() RETURNS TRIGGER AS $$
  BEGIN
    IF NEW.positive AND NOT OLD.positive THEN
      UPDATE message
        SET score = score + 2
        WHERE NEW.message_id = message.id;
    ELSIF NOT NEW.positive AND OLD.positive THEN
      UPDATE message
        SET score = score - 2
        WHERE NEW.message_id = message.id;
    END IF;
    RETURN NEW;
  END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_score_vote
  BEFORE UPDATE ON Vote
  FOR EACH ROW EXECUTE PROCEDURE update_score_vote();

CREATE FUNCTION insert_score_vote() RETURNS TRIGGER AS $$
  BEGIN
    IF NEW.positive THEN
      UPDATE message
        SET score = score + 1
        WHERE NEW.message_id = message.id;
    ELSIF NOT NEW.positive THEN
      UPDATE message
        SET score = score - 1
        WHERE NEW.message_id = message.id;
    END IF;
    RETURN NEW;
  END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER insert_score_vote
  BEFORE INSERT ON Vote
  FOR EACH ROW EXECUTE PROCEDURE insert_score_vote();

CREATE FUNCTION delete_score_vote() RETURNS TRIGGER AS $$
  BEGIN
    IF OLD.positive THEN
      UPDATE message
        SET score = score - 1
        WHERE OLD.message_id = message.id;
    ELSIF NOT OLD.positive THEN
      UPDATE message
        SET score = score + 1
        WHERE OLD.message_id = message.id;
    END IF;
    RETURN NEW;
  END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER delete_score_vote
  BEFORE DELETE ON Vote
  FOR EACH ROW EXECUTE PROCEDURE delete_score_vote();


-- Update reputation: reports
CREATE FUNCTION update_reputation_reports() RETURNS TRIGGER AS $$
  BEGIN
    UPDATE "user"
      SET reputation = reputation - (NEW.num_reports - OLD.num_reports)*10
      WHERE NEW.author = "user".id;
    RETURN NEW;
  END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_reputation_reports
  BEFORE UPDATE OF num_reports ON message
  FOR EACH ROW EXECUTE PROCEDURE update_reputation_reports();


-- Update reputation: message scores
CREATE FUNCTION update_reputation_scores() RETURNS TRIGGER AS $$
  BEGIN
    IF EXISTS (SELECT * FROM commentable WHERE NEW.id = commentable.id) THEN
      UPDATE "user"
        SET reputation = reputation + (NEW.score - OLD.score)
        WHERE NEW.author = "user".id;
    ELSIF EXISTS (SELECT * FROM comment WHERE NEW.id = comment.id) THEN
      UPDATE "user"
        SET reputation = reputation + (NEW.score - OLD.score)/2.0
        WHERE NEW.author = "user".id;
    END IF;
    RETURN NEW;
  END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_reputation_scores
  BEFORE UPDATE OF score ON message
  FOR EACH ROW EXECUTE PROCEDURE update_reputation_scores();


-- Award trusted badge
CREATE FUNCTION award_trusted() RETURNS TRIGGER AS $$
  DECLARE answer_author BIGINT;
  DECLARE trusted_id SMALLINT;
  DECLARE num_correct_answers INTEGER;
  BEGIN
    SELECT INTO answer_author author
      FROM message
      WHERE message.id = NEW.correct_answer;
    SELECT INTO trusted_id id FROM trusted_badge;
    IF NOT EXISTS
      (SELECT *
        FROM badge_attainment
        WHERE answer_author = badge_attainment.user_id AND trusted_id = badge_attainment.badge_id)
    THEN
      SELECT INTO num_correct_answers count(*)
        FROM message, question
        WHERE message.id = question.correct_answer AND message.author = answer_author;
      IF num_correct_answers >= 50 THEN
        INSERT INTO badge_attainment (user_id, badge_id) VALUES (answer_author, trusted_id);
      END IF;
    END IF;
    RETURN NEW;
  END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER award_trusted
  AFTER UPDATE OF correct_answer ON question
  FOR EACH ROW EXECUTE PROCEDURE award_trusted();


-- Award moderator badge
CREATE FUNCTION award_moderator_reputation() RETURNS TRIGGER AS $$
  DECLARE moderator_id SMALLINT;
  DECLARE trusted_id SMALLINT;
  BEGIN
    SELECT INTO moderator_id id FROM moderator_badge;
    SELECT INTO trusted_id id FROM trusted_badge;
    IF NOT EXISTS
      (SELECT *
        FROM badge_attainment
        WHERE NEW.id = badge_attainment.user_id AND moderator_id = badge_attainment.badge_id)
      AND EXISTS
      (SELECT *
        FROM badge_attainment
        WHERE NEW.id = badge_attainment.user_id AND trusted_id = badge_attainment.badge_id)
      AND NEW.reputation >= 500 THEN
        INSERT INTO badge_attainment (user_id, badge_id) VALUES (NEW.id, moderator_id);
        INSERT INTO moderator (id) VALUES (NEW.id);
    END IF;
    RETURN NEW;
  END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER award_moderator_reputation
  AFTER UPDATE OF reputation ON "user"
  FOR EACH ROW EXECUTE PROCEDURE award_moderator_reputation();

CREATE FUNCTION award_moderator_trusted() RETURNS TRIGGER AS $$
  DECLARE moderator_id SMALLINT;
  DECLARE trusted_id SMALLINT;
  DECLARE rep REAL;
  BEGIN
    SELECT INTO moderator_id id FROM moderator_badge;
    SELECT INTO trusted_id id FROM trusted_badge;
    SELECT INTO rep reputation FROM "user" WHERE "user".id = NEW.user_id;
    IF NEW.badge_id = trusted_id
    AND NOT EXISTS
      (SELECT *
        FROM badge_attainment
        WHERE NEW.user_id = badge_attainment.user_id AND moderator_id = badge_attainment.badge_id)
      AND rep >= 500 THEN
        INSERT INTO badge_attainment (user_id, badge_id) VALUES (NEW.user_id, moderator_id);
        INSERT INTO moderator (id) VALUES (NEW.user_id);
    END IF;
    RETURN NEW;
  END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER award_moderator_trusted
  AFTER INSERT ON badge_attainment
  FOR EACH ROW EXECUTE PROCEDURE award_moderator_trusted();


-- Users can't vote their own messages
CREATE FUNCTION check_own_vote() RETURNS TRIGGER AS $$
  DECLARE message_author BIGINT;
  BEGIN
    SELECT INTO message_author author
      FROM message
      WHERE message.id = NEW.message_id;
    IF message_author = NEW.user_id THEN
      RAISE EXCEPTION 'A user is not allowed to vote their own messages';
    END IF;
    RETURN NEW;
  END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_own_vote
  BEFORE INSERT ON Vote
  FOR EACH ROW EXECUTE PROCEDURE check_own_vote();
