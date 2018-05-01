<?php


namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth')->except([
            'showProfile']);
    }

    function showProfile() {
        return view('pages.profile');
    }

    public function imageUpload(Request $request)
    {
      $this->validate($request, [
          'image' => 'required|image|mimes:jpeg,png,jpg|max:2048'
      ]);

      $image = $request->file('image');
      $input['imagename'] = Auth::id() . time() . '.' . $image->getClientOriginalExtension();
      $destinationPath = public_path('/images');
      $image->move($destinationPath, $input['imagename']);

      return back()->with('success','Image Upload successful');
    }

}
