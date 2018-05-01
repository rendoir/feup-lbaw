<?php


namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{
    function showProfile() {
        return view('pages.profile');
    }

    public function imageUpload(Request $request)
    {
      if(!Auth::check())
        return response()->setStatusCode(403);

      $this->validate($request, [
          'image' => 'required|image|mimes:jpeg,png,jpg|max:2048'
      ]);

      $image = $request->file('image');
      $input['imagename'] = Auth::id() . '.' . $image->getClientOriginalExtension();
      $destinationPath = public_path('/profiles');
      $image->move($destinationPath, $input['imagename']);

      return 'profiles/' . $input['imagename'];
    }

}
