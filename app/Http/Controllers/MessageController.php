<?php

namespace App\Http\Controllers;

use App\Message;
use App\Vote;
use App\Question;
use App\Answer;
use App\MessageVersion;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;


class MessageController extends Controller
{
  public function vote(Request $request, $id) {
    $message = Message::find($id);
    if($message == null)
      return response('This message does not exist', 404);

    if(!Auth::check())
      return response('You must login to vote a message', 401);
    if($message->author == Auth::id())
      return response('You cannot vote your own message', 403);

    $positive = $request->get('positive') === 'true';

    $old_vote = DB::table('votes')->where('user_id', Auth::id())->where('message_id', $id);
    if($old_vote->first() == null) {
      //Create
      DB::table('votes')->insert(
          ['message_id' => $id, 'user_id' => Auth::id(), 'positive' => $positive]
      );
    } else {
      if($old_vote->first()->positive == $positive) {
        //Remove
        $old_vote->delete();
      } else {
        //Update
        $old_vote->update(['positive' => $positive]);
      }
    }
    $message = Message::find($id);
    return response()->json(['score' => $message->score]);
  }

  public function markCorrect($id) {
    $answer = Answer::find($id);
    if($answer == null)
      return response('This message does not exist', 404);

    if(!Auth::check())
      return response('You must login to vote a message', 401);
    if($answer->question->message->author != Auth::id() && Auth::user()->getBadge() != 'moderator')
      return response('You cannot mark this answer as correct', 403);

    if($answer->question->correct_answer == $answer->id)
      $answer->question->correct_answer = null;
    else $answer->question->correct_answer = $answer->id;
    $answer->question->save();
  }

  public function report(Request $request) {
    if(!Auth::check())
      return response('You must login to report your bookmarks', 403);

    if(!Auth::user()->hasReportOn($request->message_id))
      DB::table('reports')->insert(['message_id' => $request->message_id, 'user_id' => Auth::id()]);

    $data = [
      'type' => Message::getType($request->message_id),
      'is_banned' => Message::find($request->message_id)->first()->is_banned
    ];

    return response()->json($data, 200);
  }

  public static function editMessage(&$request,  &$message) {

      // Placeholder for the version of the comment that is going to be created
      $version = null;

      DB::transaction(function() use (&$version, &$request, &$message) {
          $version = MessageVersion::create(['content' => $request->input('content'), 'message_id' => $message->id]);
      });

      $message->latest_version = $version->id;
      $message->save();
  }
}
