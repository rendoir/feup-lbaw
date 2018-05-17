<?php

namespace App\Http\Controllers\Question;

use App\Category;
use App\Commentable;
use App\Message;
use App\MessageVersion;
use App\Question;
use App\QuestionsCategory;
use App\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;

const NUM_PER_PAGE = 10;

class QuestionsController extends Controller
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
            'showQueriedQuestions',
            'showRecentQuestions',
            'showHotQuestions',
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

                Commentable::create(['id' => $message->id]);
                $question = Question::create(['id' => $message->id, 'title' => $request->title]);
                MessageVersion::create(['content' => $request->messageContent, 'message_id' => $message->id]);

                $tags = explode(',', $request->tags);
                foreach ($tags as $tag){
                    $tagModel = Category::where('name', $tag)->first();
                    $question->categories()->attach($tagModel->id);
                }
            });

            return redirect()->route('questions', ['id' => $question->id]);
        }
        return redirect('\ask_question');
    }

    public function showAskQuestionForm() {
        return view('pages.ask_question');
    }

    public function showQueriedQuestions(Request $request) {
        $query_string = $request->get('search');
        preg_match_all('/(?<=\[).*?(?=\])/', $query_string, $tag_names);
        $query_string = preg_replace('/\[.*?\]/', "", $query_string);
        $tag_names = $tag_names[0];

        //Get Eloquent Tags
        /*$tags = [];
        for ($i=0; $i < count($tag_names); $i++) {
          $tag = Category::where('name', $tag_names[$i])->first();
          if($tag != null)
            array_push($tags, $tag);
        }*/

        $questions = Question::search($query_string);
        $questions = $questions->paginate(NUM_PER_PAGE);
        $questions->appends(['search' => $query_string]);

        return view('pages.questions', [
            'questions' => $questions,
            'request' => $request,
            'type' => 'search'
        ]);
    }

    public function showRecentQuestions() {
        $questions = Question::join('message_versions', 'questions.id', '=', 'message_versions.message_id')
        ->join('messages', 'messages.latest_version', '=', 'message_versions.id')
        ->orderByDesc('creation_time')
        ->paginate(NUM_PER_PAGE);

        return view('pages.questions',
            ['questions' => $questions, 'type' => 'recent']);
    }

    public function showHotQuestions() { // TODO order by most answers
        $questions = Question::paginate(NUM_PER_PAGE);

        return view('pages.questions',
            ['questions' => $questions, 'type' => 'hot']);
    }

    public function showHighlyVotedQuestions() {
        $questions = Question::HighlyVoted()->paginate(NUM_PER_PAGE);

        return view('pages.questions',
            ['questions' => $questions, 'type' => 'highly-voted']);
    }

    public function showActiveQuestions() {
        $questions = Question::whereRaw('correct_answer IS NULL')
            ->join('message_versions', 'questions.id', '=', 'message_versions.message_id')
            ->join('messages', 'messages.latest_version', '=', 'message_versions.id')
            ->orderByDesc('creation_time')
            ->paginate(NUM_PER_PAGE);

        return view('pages.questions',
            ['questions' => $questions, 'type' => 'active']);
    }

    public function showQuestionPage($question_id) {
        $question = Question::find($question_id);
        return view('pages.question', ['question' => $question]);
    }
}
