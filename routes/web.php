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
Route::get('login', 'Auth\LoginController@showLoginForm')->name('login');
Route::post('login', 'Auth\LoginController@login');
Route::get('logout', 'Auth\LoginController@logout')->name('logout');
Route::get('register', 'Auth\RegisterController@showRegistrationForm')->name('register');
Route::post('register', 'Auth\RegisterController@register');

Route::get('about', function() {
    return view('pages/about');
});

Route::get('ask_question', function () {
    return view('pages/ask_question');
});
    
Route::post('ask_question', 'Question\QuestionController@addQuestion');

// Search questions with string query
Route::get('questions', function(Request $request) {
    $query_string = $request->get('search');
    $page_num = $request->get('page_num', 1);
    $questions = App\Question::search($query_string)->get()->forPage($page_num, NUM_PER_PAGE);

    return view('pages/questions',
        ['questions' => $questions, 'type' => 'search', 'has_next' => (count($questions) == NUM_PER_PAGE)]);
});

Route::get('questions/recent/{page_num}', function($page_num) {
    $questions = App\Question::all()->sortByDesc(function($question) {
        return $question->message->message_version->creation_time;
    })->forPage($page_num, NUM_PER_PAGE);

    return view('pages/questions',
        ['questions' => $questions, 'type' => 'recent', 'has_next' => (count($questions) == NUM_PER_PAGE)]);
});

Route::get('questions/hot/{page_num}', function($page_num) { // TODO
    $questions = App\Question::HighlyVoted()->forPage($page_num, NUM_PER_PAGE);
    // TODO
    return view('pages/questions',
        ['questions' => $questions, 'type' => 'hot', 'has_next' => (count($questions) == NUM_PER_PAGE)]);
});

Route::get('questions/highly-voted/{page_num}', function($page_num) {
    $questions = App\Question::HighlyVoted()->forPage($page_num, NUM_PER_PAGE);

    return view('pages/questions',
        ['questions' => $questions, 'type' => 'highly-voted', 'has_next' => (count($questions) == NUM_PER_PAGE)]);
});

Route::get('questions/active/{page_num}', function($page_num) {
    $questions = App\Question::all()
        ->where('correct_answer','')
        ->sortByDesc(function($question) {
            return $question->message->message_version->creation_time;})
        ->forPage($page_num, NUM_PER_PAGE);

    return view('pages/questions',
        ['questions' => $questions, 'type' => 'active', 'has_next' => (count($questions) == NUM_PER_PAGE)]);
});

Route::get('questions/{id}', function($question_id) {
    $question = App\Question::find($question_id);

    return view('pages/question', ['question' => $question]);
});

Route::get('questions/{id}/answers/{message_id}/comments', 'Question\CommentsController@getComments');
Route::post('questions/{id}/answers/{message_id}/comments', 'Question\CommentsController@addComment');
