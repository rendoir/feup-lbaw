<?php


namespace App\Http\Controllers;

use App\Bookmark;

use Validator;
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

    function getSettings($username) {
      if(!Auth::check())
        return redirect('login');
      return view('pages.account_settings', ['user' => Auth::user()]);
    }

    function getEditProfile($username) {
      if(!Auth::check())
        return redirect('login');
      return view('pages.edit_profile', ['user' => Auth::user()]);
    }

    public function imageUpload(Request $request, $type)
    {
      if(!Auth::check())
        return response('You must login to edit your profile', 401);

      $validator = Validator::make($request->all(), [
        'image' => 'required|image|mimes:jpeg,png,jpg|max:2048'
      ]);

      if ($validator->fails()) {
          return response()->json($validator->errors(),400);
      }

      $image = $request->file('image');
      $name = Auth::id();
      $path = '/' . $type . 's';
      $full_path = public_path($path);
      $image->move($full_path, $name);

      return $path . '/' . $name;
    }

    public function editBiography(Request $request) {
      if(!Auth::check())
        return response('You must login to edit your profile', 403);

      $user = Auth::user();
      $user->biography = $request->biography;
      $user->save();
    }

    public function addBookmark(Request $request) {
      if(!Auth::check())
        return response('You must login to manage your bookmarks', 403);

      DB::table('bookmarks')->insert(['question_id' => $request->question_id, 'user_id' => Auth::id()]);
    }

    public function deleteBookmark(Request $request) {
      if(!Auth::check())
        return response('You must login to manage your bookmarks', 403);

      DB::table('bookmarks')->where('user_id', '=', Auth::id())
        ->where('question_id', '=', $request->question_id)
        ->delete();
    }

    public function getMinProfile(){
        if(!Auth::check())
            return;

        $user = Auth::user();
        $badge = $user->getBadge();
        if($badge == null)
            $have_badge = false;
        else
            $have_badge = true;

        $info = [
            'username' => $user->username,
            'bg-profile-img' => $user->getImage('background'),
            'profile-img' => $user->getImage('profile'),
            'reputaion' => $user->reputation,
            'have_badge' => $have_badge,
            'badge' => $badge,
            'questions_points' => $user->getQuestions()->count(),
            'answers_points' => $user->getAnswers()->count(),
            'comments_points' => $user->getComments()->count()
            ];

        return json_encode($info);
    }
}
