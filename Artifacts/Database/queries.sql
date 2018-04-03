-- Select all comments of a Message, order by their descending score
SELECT commentable.id, comment.id, score, is_banned, author, content, creation_time
FROM commentable, comment, message, message_version
WHERE
  commentable.id = $messageId AND
  commentable.id = comment.commentable_id AND
  comment.id = message.id AND
  message.id = message_version.message_id
ORDER BY message.score DESC;

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


-- stuff
SELECT * FROM (
  SELECT DISTINCT ON (question.id) question.id, title, correct_answer, score, is_banned, author, content, creation_time, COUNT(answer.question_id) AS num_answers
  FROM question, answer, message, message_version
  WHERE
    question.id = message.id AND
    answer.question_id = question.id AND
    message.id = message_version.message_id
  GROUP BY
    question.id, score, is_banned, author, content, creation_time
  ORDER BY
    question.id
) t;

-- stuff 2
SELECT *, COUNT(answer.question_id) AS num_answers FROM answer, (
  SELECT DISTINCT ON (question.id) question.id, title, correct_answer, score, is_banned, author, content, creation_time
  FROM question, message, message_version
  WHERE
    question.id = message.id AND
    message.id = message_version.message_id
  GROUP BY
    question.id, score, is_banned, author, content, creation_time
  ORDER BY
    question.id
) t
WHERE
  answer.question_id = t.id
GROUP BY
  t.id, answer.id, title, correct_answer, score, is_banned, author, content, creation_time;