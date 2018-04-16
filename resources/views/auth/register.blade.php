@extends('layouts.app')

@section('content')
<<<<<<< HEAD
<section class="jumbotron jumbotron-fluid mb-0" id="jumbotron_signup">
    <div id="sign-up-jumbo" class="container text-dark d-flex flex-row" style="height: 100%;">
        <div class="p-2 mx-auto">
            <h1 class="display-3 text-weight-light">Don't be left out!</h1>
            <p class="lead">Join our ever-growing user base.</p>
        </div>
        <div class="p-2 mx-auto text-dark">
            <div class="card">
                <div class="card-body">
                  <form method="POST" action="{{ route('register') }}">
                    {{ csrf_field() }}

                    <div class="form-group">
                      <label for="name">
                          <small>Username</small>
                      </label>
                      <input id="name" type="text" name="name" value="{{ old('name') }}" class="form-control" placeholder="Your username here" required autofocus>
                      @if ($errors->has('name'))
                        <span class="error">
                            {{ $errors->first('name') }}
                        </span>
                      @endif
                    </div>

                    <div class="form-group">
                      <label for="email">
                        <small>E-Mail Address</small>
                      </label>
                      <input id="email" type="email" name="email" value="{{ old('email') }}" class="form-control" aria-describedby="emailHelp" placeholder="Your email here" required>
                      @if ($errors->has('email'))
                        <span class="error">
                            {{ $errors->first('email') }}
                        </span>
                      @endif
                      <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>

                    <div class="form-group">
                      <label for="password"><small>Password</small></label>
                      <input id="password" type="password" name="password" class="form-control" placeholder="Password" required>
                      @if ($errors->has('password'))
                        <span class="error">
                            {{ $errors->first('password') }}
                        </span>
                      @endif
                    </div>

                    <div class="form-group">
                      <label for="password-confirm"><small>Confirm Password</small></label>
                      <input id="password-confirm" type="password" name="password_confirmation" class="form-control" placeholder="Password" required>
                    </div>

                    <div class="form-check">
                      <input type="checkbox" class="form-check-input" id="exampleCheck1">
                      <label class="form-check-label" for="exampleCheck1">I accept the terms and conditions.</label>
                    </div>

                    <button type="submit" class="btn btn-primary mt-2 mx-auto">
                      Sign up for SegFault
                    </button>
                    <a class="btn btn-secondary mt-2 ml-3" href="{{ route('login') }}">Login</a>
                  </form>
                </div>
            </div>
        </div>
    </div>
</section>
@endsection
=======
<main class="container-fluid px-0">
        <div class="jumbotron jumbotron-fluid mb-0" id="jumbotron_signup">
            <div id="sign-up-jumbo" class="container text-dark d-flex flex-row" style="height: 100%;">
                <div class="p-2 mx-auto">
                    <h1 class="display-3 text-weight-light">Don't be left out!</h1>
                    <p class="lead">Join our ever-growing user base.</p>
                </div>
                <div class="p-2 mx-auto text-dark">
                    <div class="card">
                        <div class="card-body">
                            <form id="signup_form">
                                <div class="form-group">
                                    <label for="username">
                                        <small>Username</small>
                                    </label>
                                    <input name="name" type="text" class="form-control" id="username" placeholder="Your username here">
                                </div>
                                <div class="form-group">
                                    <label for="email">
                                        <small>Email address</small>
                                    </label>
                                    <input name="email" type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Your email here">
                                    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                                </div>
                                <div class="form-group">
                                    <label for="password">
                                        <small>Password</small>
                                    </label>
                                    <input name="password" type="password" class="form-control" id="password" placeholder="Password">
                                </div>
                                <div class="form-group">
                                    <label for="confirm_password">
                                        <small>Confirm Password</small>
                                    </label>
                                    <input name="password_confirmation" type="password" class="form-control" id="confirm_password" placeholder="Password">
                                </div>
                                <div class="form-check">
                                    <input type="checkbox" class="form-check-input" id="check">
                                    <label class="form-check-label" for="check">I accept the terms and conditions.</label>
                                </div>
                                <button id="signup" class="btn btn-primary mt-2 mx-auto">
                                  Sign up for SegFault
                                </button>
                              </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
@endsection
>>>>>>> b183ba3358e4a18bf621d6f8850c8222c6c1b214
