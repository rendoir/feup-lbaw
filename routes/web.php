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
    return redirect('questions');
});

Route::get('questions', function() {
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

// Search questions with string query
Route::get('questions/', function(Request $request) {
    $query_string = $request->get('query');
    $page_num = $request->get('page_num', 0);
    $questions = App\Question::search($query_string)->forPage($page_num, 25);

    return view('pages/questions', ['questions' => $questions, 'type' => 'search']);
});

Route::get('questions/recent/{page_num}', function($page_num) {
    $questions = App\Question::all()->forPage($page_num, 25);
    // TODO check ordering

    return view('pages/questions', ['questions' => $questions, 'type' => 'recent']);
});

Route::get('questions/hot/{page_num}', function($page_num) {
    $questions = App\Question::HighlyVoted()->forPage($page_num, 25);
    // TODO
    return view('pages/questions', ['questions' => $questions, 'type' => 'hot']);
});

Route::get('questions/highly-voted/{page_num}', function($page_num) {
    $questions = App\Question::HighlyVoted()->forPage($page_num, 25);

    return view('pages/questions', ['questions' => $questions, 'type' => 'highly-voted']);
});

Route::get('questions/{id}/answers/{message_id}/comments', 'Question\CommentsController@getComments');
