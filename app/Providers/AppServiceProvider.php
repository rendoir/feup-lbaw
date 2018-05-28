<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Observers\AnswerObserver;
use App\Observers\CommentObserver;
use App\Answer;
use App\Comment;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Answer::observe(AnswerObserver::class);
        Comment::observe(CommentObserver::class);
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
