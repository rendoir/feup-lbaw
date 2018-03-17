-- Tables

CREATE TABLE Category (
    id SERIAL,
    name TEXT NOT NULL,
    description TEXT,
    num_posts INTEGER DEFAULT 0 NOT NULL
);

CREATE TABLE QuestionCategory (
    question_id BIGINT NOT NULL,
    category_id INTEGER NOT NULL
);

CREATE TABLE Question (
    id BIGSERIAL,
    commentable_id BIGINT NOT NULL,
    title TEXT NOT NULL,
    correct_answer BIGINT
);

CREATE TABLE Answer (
    id BIGSERIAL,
    commentable_id BIGINT NOT NULL,
    question_id BIGINT NOT NULL
);

CREATE TABLE Commentable (
    id BIGSERIAL,
    message_id BIGSERIAL
);

CREATE TABLE Comment (
    id BIGSERIAL,
    message_id BIGSERIAL NOT NULL,
    commentable_id BIGSERIAL NOT NULL
);

CREATE TABLE Message (
    id BIGSERIAL,
    creation_date TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    score INTEGER DEFAULT 0 NOT NULL,
    num_reports SMALLINT DEFAULT 0 NOT NULL,
    is_banned BOOLEAN DEFAULT FALSE
);

CREATE TABLE MessageContent (
    id BIGSERIAL,
    content TEXT NOT NULL,
    message_id BIGINT
);

CREATE TABLE TimeStamp (
    message_content_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    creation_time TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

CREATE TABLE Vote (
    message_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    positive BOOLEAN NOT NULL
);

CREATE TABLE "User" (
    id BIGSERIAL,
    username TEXT NOT NULL,
    email TEXT NOT NULL,
    password_hash TEXT NOT NULL,
    biography TEXT,
    reputation SMALLINT NOT NULL
);

CREATE TABLE Moderator (
    id BIGSERIAL,
    user_id BIGINT
);

CREATE TABLE Notification (
    id BIGSERIAL,
    description TEXT NOT NULL,
    "date" TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    read BOOLEAN NOT NULL,
    user_id BIGINT NOT NULL
);

CREATE TABLE CommentableNotification (
    id BIGSERIAL,
    notification_id BIGINT NOT NULL,
    commentable_id BIGINT NOT NULL
);

CREATE TABLE BadgeNotification (
    id BIGSERIAL,
    notification_id BIGINT NOT NULL,
    badge_id BIGINT NOT NULL
);

CREATE TABLE BadgeAttainment (
    user_id BIGINT NOT NULL,
    badge_id SMALLINT NOT NULL,
    attainment_date TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

CREATE TABLE Badge (
    id SERIAL,
    description TEXT NOT NULL
);

CREATE TABLE ModeratorBadge (
    id SERIAL,
    badge_id INTEGER NOT NULL
);

CREATE TABLE TrustedBadge (
    id SERIAL,
    badge_id INTEGER NOT NULL
);
