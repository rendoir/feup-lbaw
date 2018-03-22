CREATE FUNCTION ban_message() RETURNS TRIGGER AS $$
  BEGIN
    UPDATE Message SET is_banned = TRUE;
    RETURN new;
  END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER ban_message
  BEFORE INSERT OR UPDATE OF num_reports ON Message
  FOR EACH ROW
    WHEN ( new.num_reports >= 5 + new.score^(1/3) )
    EXECUTE PROCEDURE ban_message();
