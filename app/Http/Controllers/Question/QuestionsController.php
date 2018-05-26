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
            'showQuestionPage',
            'getRecentQuestions',
            'getHotQuestions',
            'getHighlyVotedQuestions',
            'getActiveQuestions']);
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

    public function showAskQuestionForm(Request $request) {
        $title = $request->get('title');
        return view('pages.ask_question', ['title' => $title]);
    }

    public function showQueriedQuestions(Request $request) {
        $query_string = $request->get('search');
        $operator = $request->get('operator');
        preg_match_all('/(?<=\[).*?(?=\])/', $query_string, $tag_names);
        $query_string = preg_replace('/\[.*?\]/', "", $query_string);
        $tag_names = $tag_names[0];

        $tags = Category::whereIn('name', $tag_names)->pluck('id')->toArray();

        if(!empty($tags)) {
          if($operator == 'and' || $operator == null) {
            $query = Question::query();
            foreach ($tags as $tag_id) {
                $query->whereHas('categories', function($query) use($tag_id) {
                    $query->where('id', $tag_id);
                });
            }
            $questions = $query->search($query_string)->paginate(NUM_PER_PAGE);
          }
          else if($operator == 'or') {
            $questions = Question::whereHas('categories', function($query) use($tags) {
                          $query->whereIn('id', $tags);
                      })->search($query_string)->paginate(NUM_PER_PAGE);
          }
        }
        else $questions = Question::search($query_string)->paginate(NUM_PER_PAGE);
        $questions->appends(['search' => $query_string]);

        return view('pages.questions', [
            'questions' => $questions,
            'request' => $request,
            'type' => 'search'
        ]);
    }

    public function showRecentQuestions() {
        return view('pages.questions', ['type' => 'recent']);
    }

    public function showHotQuestions() {
        return view('pages.questions', ['type' => 'hot']);
    }

    public function showHighlyVotedQuestions() {
        return view('pages.questions', ['type' => 'highly-voted']);
    }

    public function showActiveQuestions() {
        return view('pages.questions', ['type' => 'active']);
    }

    public function showQuestionPage($question_id) {
        $question = Question::find($question_id);
        return view('pages.question', ['question' => $question]);
    }

    public function getRecentQuestions(){
        $questions = Question::join('message_versions', 'questions.id', '=', 'message_versions.message_id')
            ->join('messages', 'messages.latest_version', '=', 'message_versions.id')
            ->orderByDesc('creation_time')
            ->paginate(NUM_PER_PAGE);

        return QuestionsController::questionsJSON($questions);
    }

    public function getHotQuestions() { // TODO order by most answers
        $questions = Question::paginate(NUM_PER_PAGE);

        return QuestionsController::questionsJSON($questions);
    }

    public function getHighlyVotedQuestions() {
        $questions = Question::HighlyVoted()->paginate(NUM_PER_PAGE);

        return QuestionsController::questionsJSON($questions);
    }

    public function getActiveQuestions() {
        $questions = Question::whereRaw('correct_answer IS NULL')
            ->join('message_versions', 'questions.id', '=', 'message_versions.message_id')
            ->join('messages', 'messages.latest_version', '=', 'message_versions.id')
            ->orderByDesc('creation_time')
            ->paginate(NUM_PER_PAGE);

        return QuestionsController::questionsJSON($questions);
    }

    private function questionsJSON($questions){
        $questions_info = [];
        foreach ($questions as $question) {
            $message = $question->message;
            $content = $message->message_version;
            $author = $message->get_author();
            $badge = $author->getBadge();
            if($badge == null)
                $have_badge = false;
            else
                $have_badge = true;
            $question_info = [
                "correct_answer" => ($question->correct_answer != null ? true : false),
                "question_id" => $question->id,
                "num_answers" => $question->get_num_answers(),
                "score" => $message->score,
                "title" => $question->title,
                "preview" => substr($content->content, 0, 240),
                "author" => $author->username,
                "have_badge" => $have_badge,
                "badge" => $badge,
                "categories" => $question->categories
            ];
            array_push($questions_info, $question_info);
        }

        return ["questions" => $questions_info];
    }
}
