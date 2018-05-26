<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Observers\AnswerObserver;
use App\Answer;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
        Answer::observe(AnswerObserver::class);
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
