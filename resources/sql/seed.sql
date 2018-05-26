DROP SCHEMA IF EXISTS public CASCADE;

CREATE SCHEMA public;

DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS moderators CASCADE;
DROP TABLE IF EXISTS messages CASCADE;
DROP TABLE IF EXISTS commentables CASCADE;
DROP TABLE IF EXISTS questions CASCADE;
DROP TABLE IF EXISTS answers CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS questions_categories CASCADE;
DROP TABLE IF EXISTS comments CASCADE;
DROP TABLE IF EXISTS message_versions CASCADE;
DROP TABLE IF EXISTS votes CASCADE;
DROP TABLE IF EXISTS badges CASCADE;
DROP TABLE IF EXISTS notifications CASCADE;
DROP TABLE IF EXISTS commentable_notifications CASCADE;
DROP TABLE IF EXISTS badge_notifications CASCADE;
DROP TABLE IF EXISTS badge_attainments CASCADE;
DROP TABLE IF EXISTS reports CASCADE;
DROP TABLE IF EXISTS bookmarks CASCADE;

CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT,
    biography TEXT,
    reputation REAL NOT NULL DEFAULT 0.0,
    remember_token VARCHAR(100)
    provider TEXT,
    provider_id TEXT
);

CREATE TABLE moderators (
    id BIGINT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE messages (
    id BIGSERIAL PRIMARY KEY,
    score INTEGER DEFAULT 0 NOT NULL,
    num_reports SMALLINT DEFAULT 0 NOT NULL,
    is_banned BOOLEAN DEFAULT FALSE,
    latest_version BIGINT,
    author BIGINT NOT NULL REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE commentables (
    id BIGINT PRIMARY KEY REFERENCES messages(id) ON DELETE CASCADE
);

CREATE TABLE questions (
    id BIGINT PRIMARY KEY REFERENCES commentables(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    correct_answer BIGINT UNIQUE,
    search tsvector
);

CREATE TABLE answers (
    id BIGINT PRIMARY KEY REFERENCES commentables(id) ON DELETE CASCADE,
    question_id BIGINT NOT NULL REFERENCES questions(id) ON DELETE CASCADE
);

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    num_posts INTEGER DEFAULT 0 NOT NULL
);

CREATE TABLE questions_categories (
    question_id BIGINT REFERENCES questions(id) ON DELETE CASCADE,
    category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
    PRIMARY KEY (question_id, category_id)
);

CREATE TABLE comments (
    id BIGINT PRIMARY KEY REFERENCES messages(id) ON DELETE CASCADE,
    commentable_id BIGINT NOT NULL REFERENCES commentables(id) ON DELETE CASCADE
);

CREATE TABLE message_versions (
    id BIGSERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    message_id BIGINT NOT NULL REFERENCES messages(id) ON DELETE CASCADE,
    creation_time TIMESTAMP NOT NULL DEFAULT now(),
    moderator_id BIGINT REFERENCES moderators(id) ON DELETE SET NULL
);

CREATE TABLE votes (
    message_id BIGINT NOT NULL REFERENCES messages(id) ON DELETE CASCADE,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE SET NULL,
    positive BOOLEAN NOT NULL,
    PRIMARY KEY (message_id, user_id)
);

CREATE TABLE reports (
    message_id BIGINT NOT NULL REFERENCES messages(id) ON DELETE CASCADE,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE SET NULL,
    PRIMARY KEY (message_id, user_id)
);

CREATE TABLE badges (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    description TEXT NOT NULL
);

CREATE TABLE notifications (
    id BIGSERIAL PRIMARY KEY,
    "date" TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    read BOOLEAN NOT NULL DEFAULT FALSE,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE commentable_notifications (
    id BIGINT PRIMARY KEY REFERENCES notifications(id) ON DELETE CASCADE,
    notified_msg BIGINT NOT NULL REFERENCES commentables(id) ON DELETE CASCADE,
    trigger_msg BIGINT NOT NULL REFERENCES messages(id) ON DELETE CASCADE
);

CREATE TABLE badge_notifications (
    id BIGINT PRIMARY KEY REFERENCES notifications(id) ON DELETE CASCADE,
    badge_id BIGINT NOT NULL REFERENCES badges(id) ON DELETE CASCADE
);

CREATE TABLE badge_attainments (
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    badge_id SMALLINT NOT NULL REFERENCES badges(id) ON DELETE CASCADE,
    attainment_date TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    PRIMARY KEY (user_id, badge_id)
);

CREATE TABLE bookmarks (
    question_id BIGINT REFERENCES questions(id) ON DELETE CASCADE,
    user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
    PRIMARY KEY (question_id, user_id)
);

ALTER TABLE questions
  ADD FOREIGN KEY (correct_answer) REFERENCES answers(id) ON UPDATE CASCADE ON DELETE SET NULL;

ALTER TABLE messages
  ADD FOREIGN KEY (latest_version) REFERENCES message_versions(id) ON UPDATE CASCADE ON DELETE RESTRICT;


DROP INDEX IF EXISTS comment_commentable CASCADE;
DROP INDEX IF EXISTS message_version_message CASCADE;
DROP INDEX IF EXISTS message_author CASCADE;
DROP INDEX IF EXISTS notification_user CASCADE;
DROP INDEX IF EXISTS category_name CASCADE;
DROP INDEX IF EXISTS question_title CASCADE;
DROP INDEX IF EXISTS unique_lowercase_username CASCADE;
DROP INDEX IF EXISTS unique_lowercase_email CASCADE;


-- We do not use hash indices, due to it being actively discouraged on the PostgreSQL documentation
CREATE INDEX comment_commentable ON comments USING btree(commentable_id);
CREATE INDEX message_version_message ON message_versions USING btree(message_id);
CREATE INDEX message_author ON messages USING btree(author);
CREATE INDEX notification_user ON notifications USING btree(user_id);

CREATE INDEX category_name ON categories USING gin(to_tsvector('english', name));
CREATE INDEX question_title ON questions USING gin(search);

-- Uniqueness Constraints for Case Insensitive Username and Email
CREATE INDEX unique_lowercase_username ON users (lower(username));
CREATE INDEX unique_lowercase_email ON users (lower(email));


DROP FUNCTION IF EXISTS ban_message();
DROP FUNCTION IF EXISTS check_correct();
DROP FUNCTION IF EXISTS check_categories();
DROP FUNCTION IF EXISTS insert_category();
DROP FUNCTION IF EXISTS delete_category();
DROP FUNCTION IF EXISTS update_score_vote();
DROP FUNCTION IF EXISTS insert_score_vote();
DROP FUNCTION IF EXISTS delete_score_vote();
DROP FUNCTION IF EXISTS update_reputation_reports();
DROP FUNCTION IF EXISTS update_reputation_scores();
DROP FUNCTION IF EXISTS award_trusted();
DROP FUNCTION IF EXISTS award_moderator_reputation();
DROP FUNCTION IF EXISTS award_moderator_trusted();
DROP FUNCTION IF EXISTS check_own_vote();
DROP FUNCTION IF EXISTS insert_report();
DROP FUNCTION IF EXISTS delete_report();
DROP FUNCTION IF EXISTS gen_comment_notification();
DROP FUNCTION IF EXISTS gen_answer_notification();
DROP FUNCTION IF EXISTS gen_badge_notification();
DROP FUNCTION IF EXISTS update_message_version();
DROP FUNCTION IF EXISTS update_question_title_search();


DROP TRIGGER IF EXISTS ban_message ON messages;
DROP TRIGGER IF EXISTS check_correct ON questions;
DROP TRIGGER IF EXISTS check_categories ON questions_categories;
DROP TRIGGER IF EXISTS insert_category ON questions_categories;
DROP TRIGGER IF EXISTS delete_category ON questions_categories;
DROP TRIGGER IF EXISTS update_score_vote ON votes;
DROP TRIGGER IF EXISTS insert_score_vote ON votes;
DROP TRIGGER IF EXISTS delete_score_vote ON votes;
DROP TRIGGER IF EXISTS update_reputation_reports ON messages;
DROP TRIGGER IF EXISTS update_reputation_scores ON messages;
DROP TRIGGER IF EXISTS award_trusted ON questions;
DROP TRIGGER IF EXISTS award_moderator_reputation ON users;
DROP TRIGGER IF EXISTS award_moderator_trusted ON badge_attainments;
DROP TRIGGER IF EXISTS check_own_vote ON votes;
DROP TRIGGER IF EXISTS insert_report ON reports;
DROP TRIGGER IF EXISTS delete_report ON reports;
DROP TRIGGER IF EXISTS gen_comment_notification ON comments;
DROP TRIGGER IF EXISTS gen_answer_notification ON answers;
DROP TRIGGER IF EXISTS gen_badge_notification ON badge_attainments;
DROP TRIGGER IF EXISTS update_message_version ON message_versions;
DROP TRIGGER IF EXISTS update_question_title_search_index ON questions;

-- A message is banned when it exceeds the report limits
CREATE FUNCTION ban_message() RETURNS TRIGGER AS $$
  BEGIN
    UPDATE messages
      SET is_banned = TRUE
      WHERE NEW.id = messages.id;
    RETURN NEW;
  END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER ban_message
  AFTER UPDATE OF num_reports ON messages
  FOR EACH ROW
    WHEN ( NEW.num_reports >= 5 + NEW.score^(1/3) )
      EXECUTE PROCEDURE ban_message();


-- Check if the correct answer is an answer to that question
CREATE FUNCTION check_correct() RETURNS TRIGGER AS $$
  BEGIN
    IF NEW.correct_answer IS NOT NULL AND
      NOT EXISTS (
        SELECT * FROM answers
        WHERE NEW.correct_answer = id AND NEW.id = question_id) THEN
        RAISE EXCEPTION 'An answer can only be marked as correct if it is an answer of the question';
    END IF;
    RETURN NEW;
  END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_correct
  BEFORE UPDATE OF correct_answer ON questions
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
      FROM questions_categories
      WHERE current.question_id = questions_categories.question_id;
    IF num_categories > 5 THEN
      RAISE EXCEPTION 'A question can only have a maximum of 5 categories';
    ELSIF num_categories < 1 THEN
      RAISE EXCEPTION 'A question must have at least 1 category';
    END IF;
    RETURN NEW;
  END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_categories
  AFTER INSERT OR DELETE ON questions_categories
  FOR EACH ROW EXECUTE PROCEDURE check_categories();


-- Ensure number of posts per category is always updated
CREATE FUNCTION insert_category() RETURNS TRIGGER AS $$
  BEGIN
    UPDATE categories
      SET num_posts = num_posts + 1
      WHERE NEW.category_id = categories.id;
    RETURN NEW;
  END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER insert_category
  AFTER INSERT ON questions_categories
  FOR EACH ROW EXECUTE PROCEDURE insert_category();


CREATE FUNCTION delete_category() RETURNS TRIGGER AS $$
  BEGIN
    UPDATE categories
      SET num_posts = num_posts - 1
      WHERE OLD.category_id = categories.id;
    RETURN NEW;
  END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER delete_category
  AFTER DELETE ON questions_categories
  FOR EACH ROW EXECUTE PROCEDURE delete_category();


-- Update score ON votes changes
CREATE FUNCTION update_score_vote() RETURNS TRIGGER AS $$
  BEGIN
    IF NEW.positive AND NOT OLD.positive THEN
      UPDATE messages
        SET score = score + 2
        WHERE NEW.message_id = messages.id;
    ELSIF NOT NEW.positive AND OLD.positive THEN
      UPDATE messages
        SET score = score - 2
        WHERE NEW.message_id = messages.id;
    END IF;
    RETURN NEW;
  END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_score_vote
  BEFORE UPDATE ON votes
  FOR EACH ROW EXECUTE PROCEDURE update_score_vote();

CREATE FUNCTION insert_score_vote() RETURNS TRIGGER AS $$
  BEGIN
    IF NEW.positive THEN
      UPDATE messages
        SET score = score + 1
        WHERE NEW.message_id = messages.id;
    ELSIF NOT NEW.positive THEN
      UPDATE messages
        SET score = score - 1
        WHERE NEW.message_id = messages.id;
    END IF;
    RETURN NEW;
  END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER insert_score_vote
  BEFORE INSERT ON votes
  FOR EACH ROW EXECUTE PROCEDURE insert_score_vote();

CREATE FUNCTION delete_score_vote() RETURNS TRIGGER AS $$
  BEGIN
    IF OLD.positive THEN
      UPDATE messages
        SET score = score - 1
        WHERE OLD.message_id = messages.id;
    ELSIF NOT OLD.positive THEN
      UPDATE messages
        SET score = score + 1
        WHERE OLD.message_id = messages.id;
    END IF;
    RETURN NEW;
  END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER delete_score_vote
  BEFORE DELETE ON votes
  FOR EACH ROW EXECUTE PROCEDURE delete_score_vote();


-- Update reputation: reports
CREATE FUNCTION update_reputation_reports() RETURNS TRIGGER AS $$
  BEGIN
    UPDATE users
      SET reputation = reputation - (NEW.num_reports - OLD.num_reports)*10
      WHERE NEW.author = users.id;
    RETURN NEW;
  END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_reputation_reports
  BEFORE UPDATE OF num_reports ON messages
  FOR EACH ROW EXECUTE PROCEDURE update_reputation_reports();


-- Update reputation: message scores
CREATE FUNCTION update_reputation_scores() RETURNS TRIGGER AS $$
  BEGIN
    IF EXISTS (SELECT * FROM commentables WHERE NEW.id = commentables.id) THEN
      UPDATE users
        SET reputation = reputation + (NEW.score - OLD.score)
        WHERE NEW.author = users.id;
    ELSIF EXISTS (SELECT * FROM comments WHERE NEW.id = comments.id) THEN
      UPDATE users
        SET reputation = reputation + (NEW.score - OLD.score)/2.0
        WHERE NEW.author = users.id;
    END IF;
    RETURN NEW;
  END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_reputation_scores
  BEFORE UPDATE OF score ON messages
  FOR EACH ROW EXECUTE PROCEDURE update_reputation_scores();


-- Award trusted badge
CREATE FUNCTION award_trusted() RETURNS TRIGGER AS $$
  DECLARE answer_author BIGINT;
  DECLARE trusted_id SMALLINT;
  DECLARE num_correct_answers INTEGER;
  BEGIN
    SELECT INTO answer_author author
      FROM messages
      WHERE messages.id = NEW.correct_answer;
    SELECT INTO trusted_id id FROM badges WHERE name = 'trusted';
    IF NOT EXISTS
      (SELECT *
        FROM badge_attainments
        WHERE answer_author = badge_attainments.user_id AND trusted_id = badge_attainments.badge_id)
    THEN
      SELECT INTO num_correct_answers count(*)
        FROM messages, questions
        WHERE messages.id = questions.correct_answer AND messages.author = answer_author;
      IF num_correct_answers >= 50 THEN
        INSERT INTO badge_attainments (user_id, badge_id) VALUES (answer_author, trusted_id);
      END IF;
    END IF;
    RETURN NEW;
  END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER award_trusted
  AFTER UPDATE OF correct_answer ON questions
  FOR EACH ROW EXECUTE PROCEDURE award_trusted();


-- Award moderator badge
CREATE FUNCTION award_moderator_reputation() RETURNS TRIGGER AS $$
  DECLARE moderator_id SMALLINT;
  DECLARE trusted_id SMALLINT;
  BEGIN
    SELECT INTO moderator_id id FROM badges WHERE name = 'moderator';
    SELECT INTO trusted_id id FROM badges WHERE name = 'trusted';
    IF NOT EXISTS
      (SELECT *
        FROM badge_attainments
        WHERE NEW.id = badge_attainments.user_id AND moderator_id = badge_attainments.badge_id)
      AND EXISTS
      (SELECT *
        FROM badge_attainments
        WHERE NEW.id = badge_attainments.user_id AND trusted_id = badge_attainments.badge_id)
      AND NEW.reputation >= 500 THEN
        INSERT INTO badge_attainments (user_id, badge_id) VALUES (NEW.id, moderator_id);
        INSERT INTO moderators (id) VALUES (NEW.id);
    END IF;
    RETURN NEW;
  END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER award_moderator_reputation
  AFTER UPDATE OF reputation ON users
  FOR EACH ROW EXECUTE PROCEDURE award_moderator_reputation();

CREATE FUNCTION award_moderator_trusted() RETURNS TRIGGER AS $$
  DECLARE moderator_id SMALLINT;
  DECLARE trusted_id SMALLINT;
  DECLARE rep REAL;
  BEGIN
    SELECT INTO moderator_id id FROM badges WHERE name = 'moderator';
    SELECT INTO trusted_id id FROM badges WHERE name = 'trusted';
    SELECT INTO rep reputation FROM users WHERE users.id = NEW.user_id;
    IF NEW.badge_id = trusted_id
    AND NOT EXISTS
      (SELECT *
        FROM badge_attainments
        WHERE NEW.user_id = badge_attainments.user_id AND moderator_id = badge_attainments.badge_id)
      AND rep >= 500 THEN
        INSERT INTO badge_attainments (user_id, badge_id) VALUES (NEW.user_id, moderator_id);
        INSERT INTO moderators (id) VALUES (NEW.user_id);
    END IF;
    RETURN NEW;
  END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER award_moderator_trusted
  AFTER INSERT ON badge_attainments
  FOR EACH ROW EXECUTE PROCEDURE award_moderator_trusted();


-- Users can't vote their own messages
CREATE FUNCTION check_own_vote() RETURNS TRIGGER AS $$
  DECLARE message_author BIGINT;
  BEGIN
    SELECT INTO message_author author
      FROM messages
      WHERE messages.id = NEW.message_id;
    IF message_author = NEW.user_id THEN
      RAISE EXCEPTION 'A user is not allowed to vote their own messages';
    END IF;
    RETURN NEW;
  END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_own_vote
  BEFORE INSERT ON votes
  FOR EACH ROW EXECUTE PROCEDURE check_own_vote();


CREATE FUNCTION insert_report() RETURNS TRIGGER AS $$
  BEGIN
    UPDATE messages
      SET num_reports = num_reports + 1
      WHERE NEW.message_id = messages.id;
    RETURN NEW;
  END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER insert_report
  BEFORE INSERT ON reports
  FOR EACH ROW EXECUTE PROCEDURE insert_report();

CREATE FUNCTION delete_report() RETURNS TRIGGER AS $$
  BEGIN
    UPDATE messages
      SET num_reports = num_reports - 1
      WHERE NEW.message_id = messages.id;
    RETURN NEW;
  END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER delete_report
  BEFORE DELETE ON reports
  FOR EACH ROW EXECUTE PROCEDURE delete_report();

CREATE FUNCTION gen_comment_notification() RETURNS TRIGGER AS $$
  DECLARE current_id BIGINT;
  DECLARE notified_user BIGINT;
  BEGIN
    SELECT INTO current_id nextval(pg_get_serial_sequence('notifications', 'id'));
    SELECT INTO notified_user author FROM messages WHERE messages.id = NEW.commentable_id;
    INSERT INTO notifications (id, user_id) VALUES (current_id, notified_user);
    INSERT INTO commentable_notifications (id, notified_msg, trigger_msg) VALUES (current_id, NEW.commentable_id, NEW.id);
    RETURN NEW;
  END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER gen_comment_notification
  AFTER INSERT ON comments
  FOR EACH ROW EXECUTE PROCEDURE gen_comment_notification();

CREATE FUNCTION gen_answer_notification() RETURNS TRIGGER AS $$
  DECLARE current_id BIGINT;
  DECLARE notified_user BIGINT;
  BEGIN
    SELECT INTO current_id nextval(pg_get_serial_sequence('notifications', 'id'));
    SELECT INTO notified_user author FROM messages WHERE messages.id = NEW.question_id;
    INSERT INTO notifications (id, user_id) VALUES (current_id, notified_user);
    INSERT INTO commentable_notifications (id, notified_msg, trigger_msg) VALUES (current_id, NEW.question_id, NEW.id);
    RETURN NEW;
  END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER gen_answer_notification
  AFTER INSERT ON answers
  FOR EACH ROW EXECUTE PROCEDURE gen_answer_notification();

CREATE FUNCTION gen_badge_notification() RETURNS TRIGGER AS $$
  DECLARE current_id BIGINT;
  BEGIN
    SELECT INTO current_id nextval(pg_get_serial_sequence('notifications', 'id'));
    INSERT INTO notifications (id, user_id) VALUES (current_id, NEW.user_id);
    INSERT INTO badge_notifications (id, badge_id) VALUES (current_id, NEW.badge_id);
    RETURN NEW;
  END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER gen_badge_notification
  AFTER INSERT ON badge_attainments
  FOR EACH ROW EXECUTE PROCEDURE gen_badge_notification();

CREATE FUNCTION update_message_version() RETURNS TRIGGER AS $$
  BEGIN
    UPDATE messages
      SET latest_version = NEW.id
      WHERE messages.id = NEW.message_id;
    RETURN NEW;
  END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_message_version
  AFTER INSERT ON message_versions
  FOR EACH ROW EXECUTE PROCEDURE update_message_version();

-- Question.search includes FTS index of its title and content
CREATE FUNCTION update_question_title_search() RETURNS TRIGGER AS $$
BEGIN
  UPDATE questions
    SET search =
      setweight(to_tsvector('english', NEW.title), 'A')  ||
      (SELECT setweight(to_tsvector('english', COALESCE(content, '')), 'B')
        FROM questions, messages, message_versions
        WHERE questions.id = messages.id AND
              messages.latest_version = message_versions.id
        LIMIT 1
        )
    WHERE questions.id = NEW.id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_question_title_search_index
  AFTER INSERT OR UPDATE OF title ON questions
  FOR EACH ROW EXECUTE PROCEDURE update_question_title_search();


CREATE FUNCTION update_question_content_search() RETURNS TRIGGER AS $$
BEGIN
  UPDATE questions
    SET search =
      setweight(to_tsvector('english', questions.title), 'A')  ||
      setweight(to_tsvector('english', NEW.content), 'B')
    WHERE questions.id = NEW.message_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_question_content_search_index
  AFTER INSERT ON message_versions
  FOR EACH ROW EXECUTE PROCEDURE update_question_content_search();
