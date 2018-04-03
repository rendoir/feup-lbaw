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

-- Select the first 25 questions, ordered by descending date of the last edition
SELECT DISTINCT ON (question.id) question.id, title, correct_answer, score, is_banned, author, content, creation_time
FROM question, commentable, message, message_version
WHERE 
 question.id = commentable.id AND
 commentable.id = message.id AND
 message.id = message_version.message_id
ORDER BY question.id, message_version.creation_time DESC
LIMIT 25;

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

-- Select the categories ordered by number of posts/questions in each category
SELECT name, num_posts
FROM category
ORDER BY 
  num_posts DESC;

-- For a given category, select all the questions and their contents
SELECT question_id, title, content, correct_answer, score, is_banned, author
FROM category, question, question_category, message, message_version
WHERE
  category.id = $categoryId AND
  question_category.question_id = question.id AND
  question_category.category_id = category.id AND
  question.id = message.id AND
  message.id = message_version.message_id
ORDER BY
  score DESC
LIMIT 25;
-- TODO check editions

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
