-- A message is banned when it exceeds the report limits
CREATE FUNCTION ban_message() RETURNS TRIGGER AS $$
  BEGIN
    UPDATE Message SET is_banned = TRUE;
    RETURN NEW;
  END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER ban_message
  BEFORE INSERT OR UPDATE OF num_reports ON Message
  FOR EACH ROW
    WHEN ( NEW.num_reports >= 5 + new.score^(1/3) )
    EXECUTE PROCEDURE ban_message();


-- Check if the correct answer is an answer to that question
CREATE FUNCTION check_correct() RETURNS TRIGGER AS $$
  BEGIN
    IF NOT EXISTS (SELECT * FROM Answer WHERE NEW.correct_answer = id AND NEW.id = question_id) THEN
      RAISE EXCEPTION 'An answer can only be marked as correct if it is an answer of the question';
    END IF;
    RETURN NEW;
  END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_correct
  BEFORE INSERT OR UPDATE OF correct_answer ON Question
  FOR EACH ROW EXECUTE PROCEDURE check_correct();
