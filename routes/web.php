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
    return redirect('questions');
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

Route::get('questions/{page_num?}', function($page_num = 0) {
    
    $questions = App\Question::all()->forPage($page_num, 25);
    $most_voted = App\Question::HighlyVoted()->forPage($page_num, 25)->get();

    return view('pages/questions', ['questions' => $questions, 'most_voted' => $most_voted]);
});