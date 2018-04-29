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


Route::get('/', function () {
    return redirect(route('recent_questions'));
});

//Route::get('login', 'Auth\LoginController@loginForm')->name('login_form');

// Authentication
Route::post('login', 'Auth\LoginController@login')->name('login');
Route::get('logout', 'Auth\LoginController@logout')->name('logout');
Route::get('register', 'Auth\RegisterController@showRegistrationForm')->name('register');
Route::post('register', 'Auth\RegisterController@register');

Route::get('about', 'HomeController@about')->name('about');
Route::get('404', 'HomeController@error')->name('404');


// Search questions with string query
Route::get('questions', 'Question\QuestionController@showQueriedQuestions');

Route::get('questions/recent', 'Question\QuestionController@showRecentQuestions')->name('recent_questions'); // Most recent
Route::get('questions/hot', 'Question\QuestionController@showHotQuestions')->name('hot_questions'); // Most answers
Route::get('questions/highly-voted', 'Question\QuestionController@showHighlyVotedQuestions')->name('highly_voted_questions'); // Highest score
Route::get('questions/active', 'Question\QuestionController@showActiveQuestions')->name('active_questions'); // Unanswered

Route::get('questions/{id}', 'Question\QuestionController@showQuestionPage')->name('questions');
Route::get('ask_question', 'Question\QuestionController@showAskQuestionForm')->name('ask_question_form');
Route::post('ask_question', 'Question\QuestionController@addQuestion')->name('ask_question');

// Comments
Route::get('questions/{id}/answers/{message_id}/comments', 'Question\CommentsController@getComments');
Route::post('questions/{id}/answers/{message_id}/comments', 'Question\CommentsController@addComment');
Route::put('questions/{id}/answers/{answer_id}/comments/{comment_id}', 'Question\CommentsController@editComment');
Route::delete('questions/{id}/answers/{answer_id}/comments/{comment_id}', 'Question\CommentsController@deleteComment');

// Categories
Route::get('tags', 'TagsController@showAllTags');
Route::get('tag_list', 'TagsController@getAllTags');

Auth::routes();
