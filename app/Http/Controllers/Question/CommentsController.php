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

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getComments(Request $request)
    {
        $commentable = Answer::find($request->message_id)->commentable;
        $comment_ids = $commentable->get_comments;

        $comments = array();

        foreach ($comment_ids as $comment)
            array_push($comments, $this->getCommentJSON($comment));
        
        $result = array("comments" => $comments);
        return response()->json($result);
    }


    /**
     * @param $comment
     * @return array
     */
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


    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse|void
     */
    public function addComment(Request $request)
    {
        if (!Auth::check())
            return;

        // Placeholder for the id of the comment that is going to be created
        $comment_id = null;

        DB::transaction(function() use (&$request, &$comment_id) {
            $user_id = User::find(Auth::id())->id;
            $comment_id = Message::create(['author' => $user_id])->id;
            
            DB::insert("INSERT INTO comments (id, commentable_id) VALUES (?, ?)", [$comment_id, $request->commentable]);
            MessageVersion::create(['content' => $request->input('content'), 'message_id' => $comment_id]);
        });

        return response()->json(
            $this->getCommentJSON(Comment::find($comment_id))
        );
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function editComment(Request $request)
    {
        $comment = Comment::find($request->comment);
        $message = $comment->message;

        // Checking if the User can edit the comment
        $this->authorize('edit', $message);

        $message_version = $message->message_version;

        // Updating content
        $message_version->content = $request->input('content');
        $message_version->save();

        return response()->json(
            $this->getCommentJSON($comment)
        );
    }

    public function deleteComment(Request $request)
    {
        $comment = Comment::find($request->comment);
        $message = $comment->message;

        // Checking if the User can delete the comment
        $this->authorize('delete', $message);

        //DB::transaction( function() use (&$comment, &$message) {
        DB::transaction( function() use (&$message) {
            $message->delete();
        });

            // Getting all the history of the comment
         //   $versions = $message->get_versions();

           // foreach ($versions as $version) {
            //    $version->delete();
           // }

            //$message->delete();
        //});

        return response()->json(Comment::find($request->comment));
    }
}
