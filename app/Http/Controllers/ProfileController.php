<?php


namespace App\Http\Controllers;

use App\Bookmark;

use App\Http\Controllers\Question\QuestionsController;
use Validator;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
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

    function getQuestions($username = null){
        if($username === null)
            return redirect(route('404'));

        $user = User::where('username', $username)->first();
        $questions = $user->getQuestions();
        $data = QuestionsController::questionsJSON($questions->paginate(5));
        $data['total'] = $questions->count();
        return $data;
    }

    private function getAnswersJSON($answers){
        $answers_info = [];
        foreach ($answers as $answer) {
            $message = $answer->message;
            $content = $message->message_version;
            $question = \App\Question::find($answer->question_id);
            $answer_info = [
                "correct_answer" => $question->correct_answer,
                "question_id" => $answer->question_id,
                "score" => $message->score,
                "title" => $question->title,
                "preview" => substr($content->content, 0, 240)
            ];
            array_push($answers_info, $answer_info);
        }
        return ["answers" => $answers_info];
    }

    function getAnswers($username = null){
        if($username === null)
            return redirect(route('404'));

        $user = User::where('username', $username)->first();
        $answers = $user->getAnswers();
        $data = $this->getAnswersJSON($answers->paginate(5));
        $data['total'] = $answers->count();
        return $data;
    }

    private function getCommentsJSON($comments){
        $comments_info = [];
        foreach ($comments as $comment) {
            $message = $comment->message;
            $content = $message->message_version;
            $question = \App\Question::find($comment->commentable_id);
            if($question == null)
                $question = \App\Question::find(\App\Answer::find($comment->commentable_id)->question_id);
            $comment_info = [
                "correct_answer" => $question->correct_answer,
                "question_id" => $question->id,
                "score" => $message->score,
                "title" => $question->title,
                "preview" => substr($content->content, 0, 240)
            ];
            array_push($comments_info, $comment_info);
        }
        return ["comments" => $comments_info];
    }

    function getComments($username = null){
        if($username === null)
            return redirect(route('404'));

        $user = User::where('username', $username)->first();
        $comments = $user->getComments();
        $data = $this->getCommentsJSON($comments->paginate(5));
        $data['total'] = $comments->count();
        return $data;
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

    public function notifications()
    {
        info("Fetching notifications for user " . auth()->user()->username);
        $notifications = auth()->user()->unreadNotifications()->limit(5)->get();
        info($notifications);
        return $notifications;
    }

    public function changePassword(Request $request) {
      if(!Auth::check())
        return redirect('login');

      if(Auth::user()->isRegisteredByAPI())
        return response("You can't change your password because you are registered using an external platform", 403);

      if(!Hash::check($request->get('old_password'), Auth::user()->password))
        return response('The old password is incorrect!', 400);

      $validator = Validator::make($request->all(), [
            'new_password' => 'required|string|min:6|confirmed',
      ]);

      if($validator->fails())
        return response($validator->errors()->first(), 400);

      Auth::user()->password = bcrypt($request->get('new_password'));
      Auth::user()->save();
    }

}
