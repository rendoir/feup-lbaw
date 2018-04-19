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


Route::get('/', function () {
    return redirect('questions/recent/0');
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
    $page_num = $request->get('page_num', 0);
    $questions = App\Question::Search($query_string)->forPage($page_num, 25);

    Log::debug("Query string: " . $query_string);
    Log::debug("Page number: " . $page_num);

    return view('pages/questions', ['questions' => $questions, 'type' => 'search']);
});

Route::get('questions/recent/{page_num}', function($page_num) {
    $questions = App\Question::all()->sortByDesc(function($question) {
        return $question->message->message_version->creation_time;
    })->forPage($page_num, 25);

    return view('pages/questions', ['questions' => $questions, 'type' => 'recent']);
});

Route::get('questions/hot/{page_num}', function($page_num) { // TODO
    $questions = App\Question::HighlyVoted()->forPage($page_num, 25);
    // TODO
    return view('pages/questions', ['questions' => $questions, 'type' => 'hot']);
});

Route::get('questions/highly-voted/{page_num}', function($page_num) {
    $questions = App\Question::HighlyVoted()->forPage($page_num, 25);

    return view('pages/questions', ['questions' => $questions, 'type' => 'highly-voted']);
});

Route::get('questions/active/{page_num}', function($page_num) {
    $questions = App\Question::all()->where('correct_answer', 'is', 'NULL')
        ->sortByDesc(function($question) {
            return $question->message->message_version->creation_time;})
        ->forPage($page_num, 25);

    return view('pages/questions', ['questions' => $questions, 'type' => 'recent']);
});

Route::get('questions/{id}', function($question_id) {
    $question = App\Question::find($question_id);

    return view('pages/question', ['question' => $question]);
});

Route::get('questions/{id}/answers/{message_id}/comments', 'Question\CommentsController@getComments');
