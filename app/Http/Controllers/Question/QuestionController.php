<?php

namespace App\Http\Controllers\Question;

use App\Commentable;
use App\Message;
use App\MessageVersion;
use App\Question;
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
        $message = Message::create([$request->author]);
        $commentable = Commentable::create([$message->id]);
        $question = Question::create([$commentable->id, $request->title]);
        MessageVersion::create([$request->contentMessage, $message->id, \DateTime::ATOM]);

        return $message->id;
    }
}
