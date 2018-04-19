<?php

namespace App\Http\Controllers\Question;

use Closure;
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
        $commentable = \App\Answer::find($request->message_id)->commentable;
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
}
