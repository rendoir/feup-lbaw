<?php

namespace App\Http\Controllers;

use App\Message;
use App\Vote;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;


class MessageController extends Controller
{
  public function vote(Request $request, $id) {
    $message = Message::find($id);
    if($message == null)
      return response()->setStatusCode(404);

    if(!Auth::check() || $message->author == Auth::id())
      return response()->setStatusCode(403);

    $positive = $request->get('positive');

    $old_vote = DB::table('votes')->where('user_id', Auth::id())->where('message_id', $id);
    if($old_vote->first() == null) {
      echo "create";
      //Create
      DB::table('votes')->insert(
          ['message_id' => $id, 'user_id' => Auth::id(), 'positive' => $positive]
      );
    } else {
      if($old_vote->first()->positive == $positive) {
        //Remove
        echo "remove";
        var_dump($old_vote);
        $old_vote->delete();
      } else {
        echo "update";
        //Update
        $old_vote->update(['positive' => $positive]);
      }
    }
  }
}
