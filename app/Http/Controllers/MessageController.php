<?php

namespace App\Http\Controllers;

use App\Message;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;


class MessageController extends Controller
{
  public function vote(Request $request, $id) {
    if(!Auth::check())
      return response()->setStatusCode(403);

    $message = Message::find($id);
    if($message == null)
      return response()->setStatusCode(404);

    $positive = $request->get('vote');
    Vote::where('user_id', Auth::id())->where('message_id', $id)->where('positive', !$positive)->delete();
    $vote = new Vote($id, Auth::id(), $positive);
    $vote->save();
  }
}
