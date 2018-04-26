<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

use Illuminate\Http\Request;

const NUM_PER_PAGE = 25;


Route::get('/', function () {
    return redirect('questions/recent/1');
});

// Authentication
Route::post('login', 'Auth\LoginController@login')->name('login');
Route::get('logout', 'Auth\LoginController@logout')->name('logout');
Route::get('register', 'Auth\RegisterController@showRegistrationForm')->name('register');
Route::post('register', 'Auth\RegisterController@register');

Route::get('about', 'HomeController@about')->name('about');
Route::get('404', 'HomeController@error')->name('404');


// Search questions with string query
Route::get('questions', function(Request $request) {
    $query_string = $request->get('search');
    $page_num = $request->get('page_num', 1);
    $questions = App\Question::search($query_string)->get()->forPage($page_num, NUM_PER_PAGE);

    return view('pages/questions', [
            'questions' => $questions,
            'type' => 'search',
            'has_next' => (count($questions) == NUM_PER_PAGE)
    ]);
});

// The most recent questions
Route::get('questions/recent/{page_num}', function($page_num) {
    $questions = App\Question::all()->sortByDesc(function($question) {
        return $question->message->message_version->creation_time;
    })->forPage($page_num, NUM_PER_PAGE);

    return view('pages/questions',
        ['questions' => $questions, 'type' => 'recent', 'has_next' => (count($questions) == NUM_PER_PAGE)]);
});

// Questions with the most answers
Route::get('questions/hot/{page_num}', function($page_num) {
    $questions = App\Question::all()
        ->sortByDesc(function($question) {
            return $question->get_num_answers();
        })
        ->forPage($page_num, NUM_PER_PAGE);
    return view('pages/questions',
        ['questions' => $questions, 'type' => 'hot', 'has_next' => (count($questions) == NUM_PER_PAGE)]);
});


Route::get('questions/highly-voted', 'Question\QuestionController@showHighlyVotedQuestions'); // Highest score
Route::get('questions/active', 'Question\QuestionController@showActiveQuestions'); // Unanswered

Route::get('questions/{id}', 'Question\QuestionController@showQuestionPage')->name('question');
Route::get('ask_question', 'Question\QuestionController@showAskQuestionForm')->name('ask_question_form');
Route::post('ask_question', 'Question\QuestionController@addQuestion')->name('ask_question');


Route::get('questions/{id}/answers/{message_id}/comments', 'Question\CommentsController@getComments');
Route::post('questions/{id}/answers/{message_id}/comments', 'Question\CommentsController@addComment');
Route::put('questions/{id}/answers/{answer_id}/comments/{comment_id}', 'Question\CommentsController@editComment');
