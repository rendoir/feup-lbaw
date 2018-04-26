<?php

namespace App\Http\Controllers;


class HomeController extends Controller
{
    public function about() {
        return view('pages.about');
    }

    public function error() {
        return view('pages.error');
    }
}
