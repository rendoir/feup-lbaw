-- A message is banned when it exceeds the report limits
CREATE FUNCTION ban_message() RETURNS TRIGGER AS $$
  BEGIN
    UPDATE message SET is_banned = TRUE;
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
  BEGIN
    SELECT INTO num_categories count(*)
      FROM question_category
      WHERE question_id = question_category.id;
    IF num_categories > 5 THEN
      RAISE EXCEPTION 'A questions can only have a maximum of 5 categories';
    ELSIF num_categories < 1 THEN
      RAISE EXCEPTION 'A questions must have at least 1 category';
    END IF;
    RETURN NEW;
  END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_categories
  AFTER INSERT OR UPDATE OR DELETE ON question_category
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
        SET reputation = reputation + (NEW.score - OLD.score)/2
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
  BEFORE UPDATE OF correct_answer ON question
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
