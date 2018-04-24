<?php

namespace App\Http\Controllers\Question;

use App\Commentable;
use App\Message;
use App\MessageVersion;
use App\Comment;
use App\Answer;
use App\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CommentsController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Comments Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles getting all the comments regarding a message
    |
    */

    public function getComments(Request $request)
    {
        $commentable = Answer::find($request->message_id)->commentable;
        $comment_ids = $commentable->get_comments;

        $results = array();

        foreach ($comment_ids as $comment)
            array_push($results, $this->getCommentJSON($comment));

        return response()->json($results);
    }


    private function getCommentJSON($comment)
    {
        $message = $comment->message;
        $content = $message->message_version;

        return array(
            "id" => $comment->id,
            "author" => $message->get_author()->username,
            "score" => $message->score,
            "was_edited" => $message->was_edited(),
            "content" => array (
                "version" => $content->content,
                "creation_time" => $content->creation_time,
                "author" => ($content->moderator_id != null? $content->moderator_id : $content->author)
            )
        );
    }


    public function addComment(Request $request)
    {
        /*$user = User::find($request->author);
        $commentable = Commentable::find($request->commentable);

        $message = Message::create(['author' => $user->id]);
        $comment = Comment::create(['id' => $message->id, 'commentable_id' => $commentable->id]);
        $content = MessageVersion::create(['content' => $request->content, 'message_id' => $message->id]);
*/
        return $request->content;
    }
}
