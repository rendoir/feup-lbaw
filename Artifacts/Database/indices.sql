-- Uniqueness Constraints for Case Insensitive Username and Email
CREATE INDEX unique_lowercase_username ON "user" (lower(username));
CREATE INDEX unique_lowercase_email ON "user" (lower(email));

-- We do not use hash indices, due to it being actively discouraged on the PostgreSQL documentation