<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function about() {
        return view('pages.about');
    }

    public function error() {
        return view('pages.error');
    }
}
