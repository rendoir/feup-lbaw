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
use App\Http\Controllers\MessageController;
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
            'getQueriedQuestions',
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
                MessageVersion::create(['content' => $request->input('content'), 'message_id' => $message->id]);

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

    public function editQuestion(Request $request)
    {
        $question = Question::find($request->question);
        $message = $question->message;

        // Checking if the User can edit the answer
        $this->authorize('edit', $message);
        MessageController::editMessage($request, $message);

        /*$question->categories() = "";
        $tags = explode(',', $request->tags);
        foreach ($tags as $tag) {
            $tagModel = Category::where('name', $tag)->first();
            $question->categories()->attach($tagModel->id);
        }*/

        $question->title = $request->title;
        $question->save();

        return redirect()->route('questions', ['id' => $question->id]);
    }

    public function deleteQuestion(Request $request)
    {
        $question = Question::find($request->question);
        $message = $question->message;

        // Checking if the User can edit the answer
        $this->authorize('delete', $message);

        $message->delete();
    }

    public function showAskQuestionForm(Request $request) {
        $title = $request->get('title');

        return view('pages.ask_question',
            ['isEdition' => false,
             'question_id' => null,
             'title' => $title,
             'tags' => "",
             'content' => ""]);
    }

    public function showEditQuestionForm(Request $request) {
        $question_id = $request->get('question_id');
        $title = $request->get('title');
        $tags = $request->get('tags');
        $content = $request->get('content');

        return view('pages.ask_question',
            ['isEdition' => true,
            'question_id' => $question_id,
            'title' => $title,
            'tags' => $tags,
            'content' => $content]);
    }

    public function getQueriedQuestions(Request $request) {
        $query_string = $request->get('search');
        $operator = $request->get('operator');
        $num_per_page = $request->get('num_per_page');
        if($num_per_page == null)
            $num_per_page = NUM_PER_PAGE;
        preg_match_all('/(?<=\[).*?(?=\])/', $query_string, $tag_names);
        $query_string = preg_replace('/\[.*?\]/', "", $query_string);
        $tag_names = $tag_names[0];

        $tag_ids = array();
        foreach ($tag_names as $tag) {
            $id = Category::whereRaw('lower(name) ILIKE ?', [$tag])->pluck('id');
            if ($id->isNotEmpty())
                array_push($tag_ids, $id->first());
        }

        if(!empty($tag_ids)) {
            if($operator == 'and' || $operator == null) {
                $query = Question::query();
                foreach ($tag_ids as $tag_id) {
                    $query->whereHas('categories', function($query) use($tag_id) {
                        $query->where('id', $tag_id);
                    });
                }
                $questions = $query->search($query_string)->paginate($num_per_page);
            }
            else if($operator == 'or') {
                $questions = Question::whereHas('categories', function($query) use($tag_ids) {
                    $query->whereIn('id', $tag_ids);
                })->search($query_string)->paginate($num_per_page);
            }
        }
        else $questions = Question::search($query_string)->paginate($num_per_page);
        $questions->appends(['search' => $query_string]);

        return QuestionsController::questionsJSON($questions);
    }

    public function showQueriedQuestions() {
        return view('pages.questions', [ 'type' => 'search' ]);
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
        if($question != null)
          return view('pages.question', ['question' => $question]);
        return redirect()->route('404');
    }

    public function getRecentQuestions(){
        $questions = Question::join('message_versions', 'questions.id', '=', 'message_versions.message_id')
            ->join('messages', 'messages.latest_version', '=', 'message_versions.id')
            ->orderByDesc('creation_time')
            ->paginate(NUM_PER_PAGE);

        return QuestionsController::questionsJSON($questions);
    }

    public function getHotQuestions() {
        $questions_raw = DB::table('questions')
            ->join('answers', 'questions.id', '=', 'answers.question_id')
            ->select(DB::raw('
                questions.id, count(answers.id) C
                '))
            ->groupBy('questions.id')
            ->orderByRaw('C DESC')
            ->paginate(NUM_PER_PAGE);

        $questions = array();
        foreach ($questions_raw as $q)
            array_push($questions, Question::find($q->id));

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

    public static function questionsJSON($questions) {
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
