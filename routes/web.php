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


Route::get('/home', function () {
    return redirect(route('recent_questions'));
});

// Authentication
Auth::routes();

Route::get('about', 'HomeController@about')->name('about');
Route::get('404', 'HomeController@error')->name('404');
Route::get('min-profile', 'ProfileController@getMinProfile');


// Search questions with string query
Route::get('questions', 'Question\QuestionsController@showQueriedQuestions');

Route::get('questions/recent', 'Question\QuestionsController@showRecentQuestions')->name('recent_questions'); // Most recent
Route::get('getRecentQuestions', 'Question\QuestionsController@getRecentQuestions');
Route::get('questions/hot', 'Question\QuestionsController@showHotQuestions')->name('hot_questions'); // Most answers
Route::get('getHotQuestions', 'Question\QuestionsController@getHotQuestions');
Route::get('questions/highly-voted', 'Question\QuestionsController@showHighlyVotedQuestions')->name('highly_voted_questions'); // Highest score
Route::get('getHighlyVotedQuestions', 'Question\QuestionsController@getHighlyVotedQuestions');
Route::get('questions/active', 'Question\QuestionsController@showActiveQuestions')->name('active_questions'); // Unanswered
Route::get('getActiveQuestions', 'Question\QuestionsController@getActiveQuestions');

Route::get('questions/{id}', 'Question\QuestionsController@showQuestionPage')->name('questions');
Route::get('ask_question', 'Question\QuestionsController@showAskQuestionForm')->name('ask_question_form');
Route::post('ask_question', 'Question\QuestionsController@addQuestion')->name('ask_question');

// Answers
Route::get('questions/{id}/answers', 'Question\AnswersController@getAnswers');
Route::post('questions/{id}/answers', 'Question\AnswersController@addAnswer');

// Comments
// Comments on Answers
Route::get('questions/{id}/answers/{answer_id}/comments', 'Question\CommentsController@getAnswerComments');
Route::post('questions/{id}/answers/{answer_id}/comments', 'Question\CommentsController@addComment');
Route::put('questions/{id}/answers/{answer_id}/comments/{comment_id}', 'Question\CommentsController@editComment');
Route::delete('questions/{id}/answers/{answer_id}/comments/{comment_id}', 'Question\CommentsController@deleteComment');
//Comments on Questions
Route::get('questions/{id}/comments', 'Question\CommentsController@getQuestionComments');
Route::post('questions/{id}/comments', 'Question\CommentsController@addComment');
Route::put('questions/{id}/comments/{comment_id}', 'Question\CommentsController@editComment');
Route::delete('questions/{id}/comments/{comment_id}', 'Question\CommentsController@deleteComment');

// Categories
Route::get('tags', 'TagsController@showAllTags');
Route::get('tag_list', 'TagsController@getAllTags');

//Profile
Route::get('users/{username?}', 'ProfileController@getProfile')->name('profile');
Route::get('users/{username}/edit', 'ProfileController@getEditProfile')->name('edit_profile');
Route::post('users/edit/image/{type}', 'ProfileController@imageUpload');
Route::post('users/edit/biography', 'ProfileController@editBiography');
Route::post('users/bookmarks/{question_id}', 'ProfileController@addBookmark');
Route::delete('users/bookmarks/{question_id}', 'ProfileController@deleteBookmark');

//Messages
Route::post('messages/{id}/vote', 'MessageController@vote');
Route::post('messages/{id}/mark_correct', 'MessageController@markCorrect');


// Testing Notifications' Server
Route::get('test/notifications-view', function() {
    return view('notifications_test');
});

Route::get('test/notifications-hello-world', function() {
  require __DIR__ . '/../vendor/autoload.php';

  $options = array(
    'cluster' => 'eu',
    'encrypted' => true
  );
  $pusher = new Pusher\Pusher(
    '***REMOVED***',
    '***REMOVED***',
    '***REMOVED***',
    $options
  );

  $data['message'] = 'hello world';
  $pusher->trigger('my-channel', 'my-event', $data);
});
