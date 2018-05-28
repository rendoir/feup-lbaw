<?php

namespace App\Observers;

use App\Notifications\NewAnswer;
use App\Comment;
use App\Commentable;
use App\Notifications\NewComment;
use function Psy\debug;

class CommentObserver
{
    public function created(Comment $comment)
    {
        $user = $comment->message->get_author();
        $commentable = $comment->commentable;
        $commentable_author = $commentable->message->get_author();

        // Notify Commentable's Author
        if ($user->id != $commentable_author->id)
            $commentable_author->notify(new NewComment($user, $comment, true));

        // Notify all users taking part in the discussion
        foreach ($commentable->get_followers() as $follower) {
            if ($user->id != $follower->id)
                $follower->notify(new NewAnswer($user, $comment, false));
        }
    }
}
