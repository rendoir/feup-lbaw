<?php

namespace App\Http\Controllers\Question;

use App\Commentable;
use App\Message;
use App\MessageVersion;
use App\Question;
use App\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;

class QuestionController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function addQuestion(Request $request)
    {
        if (Auth::check()) {
            $question = null;
            DB::transaction(function() use (&$request, &$question) {
                $user = User::find(Auth::id());
                $message = Message::create(['author' => $user->id]);
                $commentable = Commentable::create(['id' => $message->id]);
                $question = Question::create(['id' => $commentable->id, 'title' => $request->title]);
                MessageVersion::create(['content' => $request->messageContent, 'message_id' => $message->id]);
            });
            return redirect()->route('question', ['id' => $question->id]);
        }
        return redirect('\ask_question');
    }
}
