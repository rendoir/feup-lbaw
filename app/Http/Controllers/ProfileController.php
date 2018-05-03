<?php


namespace App\Http\Controllers;

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

    public function profileImageUpload(Request $request)
    {
      if(!Auth::check())
        return response()->setStatusCode(403);

      $this->validate($request, [
          'image' => 'required|image|mimes:jpeg,png,jpg|max:2048'
      ]);

      $image = $request->file('image');
      $input['imagename'] = Auth::id();
      $destinationPath = public_path('/profiles');
      $image->move($destinationPath, $input['imagename']);

      return '/profiles\/' . $input['imagename'];
    }

}
