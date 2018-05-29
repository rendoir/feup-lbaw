<?php

namespace App\Providers;

use App\BadgeAttainment;
use App\Observers\BadgeAttainmentObserver;
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
        BadgeAttainment::observe(BadgeAttainmentObserver::class);
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
