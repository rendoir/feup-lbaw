-- We do not use hash indices, due to it being actively discouraged on the PostgreSQL documentation

CREATE INDEX comment_commentable ON comment USING btree(commentable_id);
CREATE INDEX message_version_message ON message_version USING btree(message_id);
CREATE INDEX message_author ON message USING btree(author);
CREATE INDEX notification_user ON notification USING btree(user_id);

CREATE INDEX tag_name ON tag USING gin(name);
CREATE INDEX question_title ON question USING gist(to_tsvector('english', title));


-- Uniqueness Constraints for Case Insensitive Username and Email
CREATE INDEX unique_lowercase_username ON "user" (lower(username));
CREATE INDEX unique_lowercase_email ON "user" (lower(email));


