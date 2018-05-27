<?php

namespace App\Http\Controllers;

use App\Mail\TestMail;
use Illuminate\Support\Facades\Auth;

class MailController extends Controller
{
  public function testMail() {
    \Mail::to(Auth::user())->send(new TestMail);
  }
}
