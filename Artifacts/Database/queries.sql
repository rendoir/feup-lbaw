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
  category.id = 4 AND
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
SELECT DISTINCT ON (creation_time, question.id) question.id, title, content, score, creation_time, is_banned
FROM "user" u, message, message_version, question
WHERE
  u.id = 4 AND
  u.id = message.author AND
  message.id = question.id AND
  message.id = message_version.message_id
GROUP BY
  question.id, title, content, score, creation_time, is_banned
ORDER BY
  creation_time DESC,
  question.id;

-- SELECT09
-- Select all of a User's answers
SELECT DISTINCT ON (creation_time, answer.id) answer.id, content, score, creation_time, is_banned
FROM "user" u, message, message_version, answer
WHERE
  u.id = 4 AND
  u.id = message.author AND
  message.id = answer.id AND
  message.id = message_version.message_id
GROUP BY
  answer.id, content, score, creation_time, is_banned
ORDER BY
  creation_time DESC,
  answer.id;

-- SELECT10
-- Select all of a User's comments
SELECT DISTINCT ON (creation_time, comment.id) comment.id, content, score, creation_time, is_banned
FROM "user" u, message, message_version, comment
WHERE
  u.id = 7 AND
  u.id = message.author AND
  message.id = comment.id AND
  message.id = message_version.message_id
GROUP BY
  comment.id, content, score, creation_time, is_banned
ORDER BY
  creation_time DESC,
  comment.id;

-- SELECT11
-- Select all of a User's correct answers


-- SELECT12
-- Select all of a User's unread notifications

-- SELECT13
-- Select all of a User's badges

-- SELECT14
-- Select a User's profile information

-- SELECT15
-- Select a User's total number of questions

-- SELECT16
-- Select a User's total number of answers

-- SELECT17
-- Select a User's total number of comments

-- SELECT18
-- Select all tags that partially match a given string *

-- SELECT19
-- Select all questions whose title partially matches a given string *



-- ** Most Common Modifications ** --
-- insert a new message version; insert a new question/answer/comment; update user's bio; inserting a new vote (!!!)

-- There are no deletes, because data rules all.






-- USELESS STUFF

-- Select the number of answers of a given question (to be deleted, mby) TODO
SELECT question.id, COUNT(answer.question_id)
FROM question, answer, message
WHERE
  question.id = $messageId AND
  question.id = message.id AND
  answer.question_id = question.id
GROUP BY
  question.id;
