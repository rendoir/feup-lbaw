<?php

namespace App\Http\Controllers\Question;

use App\Commentable;
use App\Message;
use App\MessageVersion;
use App\Question;
use App\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class QuestionController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
    }

    /*
    |--------------------------------------------------------------------------
    | Questions Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles getting all the comments regarding a message
    |
    */

    public function addQuestion(Request $request)
    {
        $user = User::find($request->author);
        $message = Message::create(['author' => $user->id]);
        $commentable = Commentable::create(['id' => $message->id]);
        $question = Question::create(['id' => $commentable->id, 'title' => $request->title]);
        MessageVersion::create(['content' => $request->messageContent, 'message_id' => $message->id]);

        return $question;
    }
}
