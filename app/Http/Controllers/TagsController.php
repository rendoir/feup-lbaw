<?php


namespace App\Http\Controllers;


class TagsController extends Controller
{
    function showAllTags() {
        return view('pages.tags', ['tags' => \App\Category::all()]);
    }
}

