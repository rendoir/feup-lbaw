<?php

namespace App\Http\Controllers\Question;

use App\Commentable;
use App\Message;
use App\MessageVersion;
use App\Comment;
use App\Answer;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
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
        $author = $message->get_author();

        return array(
            "id" => $comment->id,
            "author" => $author->username,
            "score" => $message->score,
            "was_edited" => $message->was_edited(),
            "is_owner" => ($author->id == Auth::id()),
            "content" => array (
                "version" => $content->content,
                "creation_time" => $content->creation_time,
                "author" => ($content->moderator_id != null? $content->moderator_id : $content->author)
            )
        );
    }


    public function addComment(Request $request)
    {
        if (!Auth::check())
            return;

        $user_id = Auth::id();
        /*$commentable = Commentable::find($request->commentable);

        $message = Message::create(['author' => $user]);
        $comment = Comment::create(['id' => $message->id, 'commentable_id' => $commentable->id]);
        $content = MessageVersion::create(['content' => $request->content, 'message_id' => $message->id]);*/
        
        $comment_id = null;

        DB::transaction(function() use (&$request, &$user_id, &$comment_id) {
            DB::insert("INSERT INTO messages (author) VALUES (?)", [$user_id]);
            $comment_id = DB::getPdo()->lastInsertId();
            DB::insert("INSERT INTO comments (id, commentable_id) VALUES (?, ?)", [$comment_id, $request->commentable]);
            DB::insert("INSERT INTO message_versions (content, message_id) values (?, ?)", [$request->content, $comment_id]);
        });

        return response()->json(
            $this->getCommentJSON(Comment::find($comment_id))
        );
    }

    public function editComment(Request $request)
    {
        $comment = Comment::find($request->comment);

        // Checking if the User can edit the comment
        $this->authorize('edit', $comment);

        // TODO
    }
}
