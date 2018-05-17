<?php


namespace App\Http\Controllers;

use App\Bookmark;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

use App\User;

class ProfileController extends Controller
{
    function getProfile($username = null) {
      if($username === null)
        if(Auth::check())
          return redirect(route('profile', ['username' => Auth::user()->username]));
        else return redirect(route('404'));

      $user = User::where('username', $username)->first();
      if($user != null)
        return view('pages.profile', ['user' => $user]);
      else return redirect(route('404'));
    }

    function getEditProfile($username) {
      if(!Auth::check())
        return redirect('login');
      return view('pages.edit_profile', ['user' => Auth::user()]);
    }

    public function imageUpload(Request $request, $type)
    {
      if(!Auth::check())
        return response()->setStatusCode(403);

      $this->validate($request, [
          'image' => 'required|image|mimes:jpeg,png,jpg|max:2048'
      ]);

      $image = $request->file('image');
      $name = Auth::id();
      $path = '/' . $type . 's';
      $full_path = public_path($path);
      $image->move($full_path, $name);

      return $path . '/' . $name;
    }

    public function editBiography(Request $request) {
      if(!Auth::check())
        return response()->setStatusCode(403);

      $user = Auth::user();
      $user->biography = $request->biography;
      $user->save();
    }

    public function addBookmark(Request $request) {
      if(!Auth::check())
        return response()->setStatusCode(403);

      DB::table('bookmarks')->insert(['question_id' => $request->question_id, 'user_id' => Auth::id()]);
    }

    public function deleteBookmark(Request $request) {
      if(!Auth::check())
        return response()->setStatusCode(403);

      DB::table('bookmarks')->where('user_id', '=', Auth::id())
        ->where('question_id', '=', $request->question_id)
        ->delete();
    }
}
