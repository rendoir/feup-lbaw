-- SELECT01
-- Select all comments of a Message, order by their descending score
SELECT commentable.id, comment.id, score, is_banned, author, content, creation_time
FROM commentable, comment, message, message_version
WHERE
  commentable.id = $messageId AND
  commentable.id = comment.commentable_id AND
  comment.id = message.id AND
  message.id = message_version.message_id
ORDER BY message.score DESC;
-- TODO check editions

-- SELECT02
-- Select the first 25 questions, ordered by descending date of the last edition
SELECT DISTINCT ON (question.id) question.id, title, correct_answer, score, is_banned, author, content, creation_time
FROM question, commentable, message, message_version
WHERE 
 question.id = commentable.id AND
 commentable.id = message.id AND
 message.id = message_version.message_id
ORDER BY question.id, message_version.creation_time DESC
LIMIT 25;
--TODO check

-- SELECT03
-- Select the IDs of the 25 questions with most answers (the most discussed questions)
SELECT question.id, COUNT(answer.question_id) AS num_answers
FROM question, answer, message
WHERE
  question.id = message.id AND
  answer.question_id = question.id
GROUP BY
  question.id
ORDER BY
  num_answers DESC
LIMIT 25;

-- SELECT04
-- Select the contents ot the 25 most answered questions
SELECT * FROM (
  SELECT question.id, COUNT(answer.question_id) AS num_answers
  FROM question, answer, message
  WHERE
    question.id = message.id AND
    answer.question_id = question.id
  GROUP BY
    question.id
  ORDER BY
    num_answers DESC
  LIMIT 25
) most_answered
JOIN (
  SELECT DISTINCT ON (question.id) question.id, title, correct_answer, score, is_banned, author, content, creation_time
  FROM question, commentable, message, message_version
  WHERE 
   question.id = commentable.id AND
   commentable.id = message.id AND
   message.id = message_version.message_id
) info
ON
  most_answered.id = info.id
ORDER BY
  most_answered.num_answers DESC;

-- SELECT05
-- Select the categories ordered by number of posts/questions in each category
SELECT name, num_posts
FROM category
ORDER BY 
  num_posts DESC;

-- SELECT06
-- For a given category, select the 25 most recent questions and their contents (and select only those that aren't banned)
SELECT DISTINCT ON (creation_time, question.id) category.id, question_id, title, content, correct_answer, score, creation_time, is_banned, author
FROM category, question, question_category, message, message_version
WHERE
  category.id = $categoryId AND
  question_category.question_id = question.id AND
  question_category.category_id = category.id AND
  question.id = message.id AND
  message.id = message_version.message_id
GROUP BY question.id, category.id, question_category.question_id, title, content, correct_answer, score, creation_time, is_banned, author, content
HAVING
  is_banned = FALSE
ORDER BY
  message_version.creation_time DESC,
  question.id
LIMIT 25;
--TODO check

-- SELECT07
-- Select all the answers of a given question, from newest to oldest
SELECT DISTINCT ON (answer.id) answer.id, content, creation_time, is_banned, author
FROM question, answer, message, message_version
WHERE
  question.id = $questionId AND
  question.id = answer.question_id AND
  answer.id = message.id AND
  message.id = message_version.message_id
GROUP BY
  answer.id, content, creation_time, is_banned, author
ORDER BY
  answer.id,
  creation_time DESC;

-- SELECT08
-- Select all of a User's questions
SELECT *
FROM (
  SELECT DISTINCT ON (question.id) question.id, title, content, score, creation_time, is_banned
  FROM "user" u, message, message_version, question
  WHERE
    u.id = $user.Id AND
    u.id = message.author AND
    message.id = question.id AND
    message.id = message_version.message_id
  GROUP BY
    question.id, title, content, score, creation_time, is_banned
  ORDER BY
    question.id,
    creation_time DESC
  ) updated_questions
ORDER BY
  updated_questions.creation_time DESC;

-- SELECT09
-- Select all of a User's answers
SELECT *
FROM (
  SELECT DISTINCT ON (answer.id) answer.id, content, score, creation_time, is_banned
  FROM "user" u, message, message_version, answer
  WHERE
    u.id = $user.Id AND
    u.id = message.author AND
    message.id = answer.id AND
    message.id = message_version.message_id
  GROUP BY
    answer.id, content, score, creation_time, is_banned
  ORDER BY
    answer.id,
    creation_time DESC
  ) updated_answers
ORDER BY
  updated_answers.creation_time DESC;

-- SELECT10
-- Select all of a User's comments
SELECT *
FROM (
  SELECT DISTINCT ON (comment.id) comment.id, content, score, creation_time, is_banned
  FROM "user" u, message, message_version, comment
  WHERE
    u.id = $usedId AND
    u.id = message.author AND
    message.id = comment.id AND
    message.id = message_version.message_id
  GROUP BY
    comment.id, content, score, creation_time, is_banned
  ORDER BY
    comment.id,
    creation_time DESC
  ) updated_comments
ORDER BY
  updated_comments.creation_time DESC;

-- SELECT11
-- Select all of a User's correct answers
SELECT answer.id, score, is_banned
FROM answer, question, message, "user" u
WHERE
  u.id = $ usedId AND
  u.id = message.author AND
  message.id = answer.id AND
  answer.id = question.correct_answer;

-- SELECT12
-- Select all of a User's unread notifications
SELECT notification.id, notification.date
FROM "user" u, notification
WHERE
  u.id = $userId AND
  u.id = notification.user_id
GROUP BY
  u.id, notification.id
HAVING
  notification.read = FALSE;

-- SELECT13
-- Select all of a User's badges
SELECT badge.id, description, attainment_date
FROM "user" u, badge_attainment b_a, badge
WHERE
  u.id = b_a.user_id AND
  b_a.badge_id = badge.id;

-- SELECT14
-- Select a User's profile information
SELECT username, email, biography, reputation
FROM "user" u
WHERE
  u.id = $userId;

-- SELECT15
-- Select a User's total number of questions
SELECT u.id, COUNT(*)
FROM "user" u, message, question
WHERE
  u.id = $userId AND
  u.id = message.author AND
  message.id = question.id
GROUP BY
  u.id;

-- SELECT16
-- Select a User's total number of answers
SELECT u.id, COUNT(*)
FROM "user" u, message, answer
WHERE
  u.id = $userId AND
  u.id = message.author AND
  message.id = answer.id
GROUP BY
  u.id;

-- SELECT17
-- Select a User's total number of comments
SELECT u.id, COUNT(*)
FROM "user" u, message, comment
WHERE
  u.id = $userId AND
  u.id = message.author AND
  message.id = comment.id
GROUP BY
  u.id;

-- SELECT18
-- Select all tags that partially match a given string *
SELECT *
FROM category
WHERE
  name LIKE '%$search%';

-- SELECT19
-- Select all questions whose title partially matches a given string *
SELECT *
FROM question
WHERE
  title LIKE '%$search%';


-- ** Most Common Modifications **

-- INSERT01
-- Adding a new message version, either meaning the message was edited or is being added
INSERT INTO message_version (id, content, message_id, creation_time, moderator_id)
 VALUES (nextval('message_version_id_seq'::regclass), $content, $message_id, now(), $moderator_id);

 -- INSERT02
 -- Insert a new Question
 INSERT INTO question (id, title, correct_answer)
 VALUES ($id, $title, $correct_answer);

 -- INSERT03
 -- Create a new Answer
INSERT INTO answer(id, question_id)
 VALUES ($id, $question_id);

 -- INSERT04
 -- Create new Comment
INSERT INTO comment(id, commentable_id)
 VALUES ($id, $commentable_id);

 -- INSERT05
 -- New user registered
INSERT INTO "user"(id, username, email, password_hash, biography, reputation)
 VALUES (nextval('user_id_seq'::regclass), $username, $email, $password_hash, $biography, 0.0);

 -- INSERT06
 -- Vote in a Message
INSERT INTO vote(message_id, user_id, positive)
 VALUES ($message_id, $user_id, $positive);

 -- UPDATE01
 -- Update User Info
UPDATE "user"
SET username = $username, email = $email, password_hash = $password_hash, biography = $biography
WHERE id= $id;

-- There are no deletes, because data rules all.