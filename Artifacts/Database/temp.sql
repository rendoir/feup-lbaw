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
