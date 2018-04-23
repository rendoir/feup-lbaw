<?php

namespace App\Http\Controllers\Question;

use App\Commentable;
use App\Message;
use App\MessageVersion;
use App\Question;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;

class QuestionController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function addQuestion(Request $request)
    {
        if (Auth::check()) {
          $id = 0;
          DB::transaction(function() use (&$request, &$id) {
            DB::insert("INSERT INTO messages (author) VALUES (?)", [Auth::id()]);
            $id = DB::getPdo()->lastInsertId();
            DB::insert("INSERT INTO commentables (id) VALUES (?)", [$id]);
            DB::insert("INSERT INTO questions (id, title) VALUES (?, ?)", [$id, $request->title]);
            DB::insert("INSERT INTO message_versions (content, message_id) VALUES (?, ?)", [$request->content, $id]);
          });
          return redirect()->route('question', ['id' => $id]);
        }
    }
}
