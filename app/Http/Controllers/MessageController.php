<?php

namespace App\Http\Controllers;

use App\Message;
use App\Vote;

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

    $old_vote = Vote::where('user_id', Auth::id())->where('message_id', $id)->first();
    if($old_vote == null) {
      //Create
      $vote = Vote::create(['message_id' => $id, 'user_id' => Auth::id(), 'positive' => $positive]);
      $vote->save();
    } else {
      if($old_vote->positive == $positive) {
        //Remove
        $old_vote->delete();
      } else {
        //Update
        $old_vote->positive = $positive;
        $old_vote->save();
      }
    }
  }
}
