<?php

namespace App\Http\Controllers\Question;

use App\Commentable;
use App\Message;
use App\MessageVersion;
use App\Question;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

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
        print("HELLO QUESTION");
        return;
        /*
        BEGIN TRANSACTION;
        SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;

        DO $$
        DECLARE
          new_id INTEGER;
        BEGIN
          INSERT INTO messages (author) VALUES (1) RETURNING id INTO new_id;
          INSERT INTO commentables (id) VALUES (new_id);
          INSERT INTO questions (id, title) VALUES (new_id, 'my_title');
          INSERT INTO message_versions (content, message_id) values ('my_content', new_id);
        END $$;

        COMMIT;
        */

        /*
        $message = Message::create([$request->author]);
        $commentable = Commentable::create([$message->id]);
        $question = Question::create([$commentable->id, $request->title]);
        MessageVersion::create([$request->contentMessage, $message->id, \DateTime::ATOM]);

        return $message->id;
        */
    }
}
