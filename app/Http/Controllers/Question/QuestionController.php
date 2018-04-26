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
    protected $redirectTo = '/';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth')->except([
            'showHighlyVotedQuestions',
            'showActiveQuestions',
            'showQuestionPage']);
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
            return $question;
        }
        return null;
    }

    public function showAskQuestionForm() {
        return view('pages.ask_question');
    }

    public function showHighlyVotedQuestions() {
        $questions = Question::HighlyVoted()->paginate(10);

        return view('pages/questions',
            ['questions' => $questions, 'type' => 'highly-voted', 'has_next' => (count($questions) == NUM_PER_PAGE)]);
    }

    public function showActiveQuestions() {
        $questions = Question::whereRaw('correct_answer IS NULL')
            ->join('messages', 'messages.id', '=', 'questions.id')
            ->join('message_versions', 'message_versions.id', '=', 'messages.latest_version')
            ->orderBy('creation_time')
            ->paginate(10);

        return view('pages/questions',
            ['questions' => $questions, 'type' => 'active', 'has_next' => (count($questions) == NUM_PER_PAGE)]);
    }

    public function showQuestionPage($question_id) {
        $question = Question::find($question_id);
        return view('pages.question', ['question' => $question]);
    }
}
