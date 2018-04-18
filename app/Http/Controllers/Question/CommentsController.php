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

    public function getComments(Request $request, $id)
    {
        $commentable = \App\Answer::find($request->id)->commentable;
        $comment_ids = $commentable->get_comments;

        $results = array();

        foreach ($comment_ids as $comment) {
            $message = $comment->message;
            $content = $message->message_version;

            array_push($results, array(
                "id" => $comment->id,
                "author" => $message->get_author()->username,
                "score" => $message->score,
                "was_edited" => $message->was_edited(),
                "content" => array (
                    "version" => $content->content,
                    "creation_time" => $content->creation_time,
                    "author" => ($content->moderator_id != null? $content->moderator_id : $content->author)
                )
            ));
        }

        return response()->json($results);
    }
}
