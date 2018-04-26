<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="google-signin-client_id" content="***REMOVED***.apps.googleusercontent.com">

  <!-- CSRF Token -->
  <meta name="csrf-token" content="{{ csrf_token() }}">

  <title>{{ config('app.name', 'SegFault') }}</title>

  <script type="text/javascript">
      // Fix for Firefox autofocus CSS bug
      // See: http://stackoverflow.com/questions/18943276/html-5-autofocus-messes-up-css-loading/18945951#18945951
  </script>
  <script type="text/javascript" src="{{ asset('js/app.js') }}" defer></script>

  <!-- Font Awesome -->
  <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.10/css/all.css" integrity="sha384-+d0P83n9kaQMCwj8F4RJB66tzIwOKmrdb46+porD/OvrJ+37WqIM7UoBtwHO6Nlg" crossorigin="anonymous">

  <!-- Bootstrap v4 CSS -->
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
        crossorigin="anonymous">

  <!-- Styling  -->
  <link rel="stylesheet" type="text/css" media="screen" href="{{ asset('css/app.css') }}" />

  <!-- Editor -->
  <script src="https://cdn.jsdelivr.net/simplemde/latest/simplemde.min.js"></script>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/simplemde/latest/simplemde.min.css">

  <script src="https://cdn.jsdelivr.net/highlight.js/latest/highlight.min.js"></script>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/highlight.js/latest/styles/github.min.css">

</head>

<body>
<header class="sticky-top">
  <div id="navbar" class="bg-light">
    <nav class="navbar navbar-expand-lg navbar-light container">
      <!-- Logo -->
      <a class="navbar-brand py-0 order-0 mr-0 mr-sm-3"href="{{ url('questions') }}">
        <img src="{{ asset('img/logo.png') }}" width="40" height="40" class="d-inline-block align-center" alt="">
        <span>SegFault</span>
      </a>

      <!-- Collapse Menu -->
      <button class="navbar-toggler mr-auto-sm order-2 ml-sm-3" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup"
              aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse order-sm-1 ml-3" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <a class="nav-item nav-link active" href="{{ url('questions/recent/1') }}">Questions
            <span class="sr-only">(current)</span>
          </a>
          <a class="nav-item nav-link" href="{{ url('tags') }}">Categories</a>
        </div>

        <!-- Search Bar -->
        <form class="form-inline" method="GET" action="{{ url('questions') }}">
          <input class="form-control mx-sm-2" type="text" name="search" placeholder="Search" aria-label="Search"
          @if(isset($request) && $request->has('search')) <?php echo 'value="' . htmlspecialchars($_GET['search']) . '"' ?> @endif>
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
      </div>

      <!-- START OF NAVBAR RIGHT-SIDE OPTIONS -->
      <div class="ml-auto-sm px-0 order-1 order-sm-2 d-flex justify-content-between justify-content-sm-end">

      @if (Auth::check())
        <!-- Notifications Dropdown -->
          <div class="dropdown mx-2">
                        <span class="big-icon" id="notifications" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <div class="pt-1">
                                <i class="fa fa-bell"></i>
                            </div>
                        </span>
            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="notifications">
              <button class="dropdown-item" type="button">
                <i class="fa fa-thumbs-up"></i>
                JohnDoe00 upvoted your Question
              </button>
              <div class="dropdown-divider"></div>
              <button class="dropdown-item" type="button">
                <i class="fa fa-comments"></i>
                JohnDoe00 answered your Question
              </button>
              <div class="dropdown-divider"></div>
              <button class="dropdown-item" type="button">
                <i class="fa fa-check-circle"></i>
                Moderator Tester33 selected a correct answer for your Question
              </button>
            </div>
          </div>

          <!-- Options Dropdown-->
          <div class="dropdown px-1">
                        <span class="big-icon mx-2" id="profile-options" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <img class="rounded-circle" src="{{ asset('img/img-profile-icon.jpg') }}" alt="profile picture">
                        </span>
            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="profile-options">
              <a href="own-profile.html" class="dropdown-item" role="button">Profile</a>
              <div class="dropdown-divider"></div>
              <a href="account.html" class="dropdown-item" role="button">Settings</a>
              <div class="dropdown-divider"></div>
              <form method="GET" action="{{ route('logout') }}">
                <button id="login" type="submit" class="dropdown-item">Log out</button>
              </form>
            </div>
          </div>

      </div>

    @else
      <!-- Sign In/Sign Up -->
        <div class="dropdown mx-2">
          <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">
            Sign In
            <span class="caret"></span>
          </button>
          <div class="dropdown-menu dropdown-menu-right">
            <form id="signin_form" class="px-4 py-3" method="POST" action="{{ route('login') }}">
              {{ csrf_field() }}
              <div class="form-gruoup">
                <label for="email">E-mail</label>
                <input id="email" class="form-control" type="text" name="email"  placeholder="email@example.com" value="{{ old('email') }}" required autofocus>
              </div>

              <div class="form-group">
                <label for="password" >Password</label>
                <input id="password" class="form-control" type="password" name="password" placeholder="Password" required>
              </div>

              <div class="form-check">
                <label>
                  <input type="checkbox" name="remember" {{ old('remember') ? 'checked' : '' }}> Remember Me
                </label>
              </div>

              <button id="login" type="submit" class="btn btn-primary btn-signin">Sign in</button>
              <a class="btn btn-social btn-github btn-signin mt-0" href="#">
                <i class="fab fa-github"></i>
                <div>Sign in with Github</div>
              </a>

              <div class="btn-signin">
                <div class="g-signin2" data-onsuccess="onSignIn" data-width="202" data-height="34" data-longtitle="true">button</div>
              </div>
            </form>

            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="{{ route('register') }}">New around here? Sign up</a>
          </div>
        </div>

        <!-- Sign up -->
        <div class="dropdown mx-2">
          <a class="btn btn-outline-success" href="{{ route('register') }}" role="button">Sign Up</a>
        </div>

        <!-- END OF NAVBAR RIGHT-SIDE OPTIONS -->
      @endif

    </nav>
  </div>
  @if ($errors->isNotEmpty())
    <div class="alert alert-danger alert-dismissible" role="alert">
      <div class="container">
        <div class="d-flex justify-content-between">
          <div>
            @if ($errors->has('name'))
                {{ $errors->first('name') }}
            @elseif ($errors->has('email'))
                {{ $errors->first('email') }}
            @elseif ($errors->has('password'))
                {{ $errors->first('password') }}
            @elseif ($errors->has('accept'))
                {{ $errors->first('accept') }}
            @endif
          </div>
          <button type="button" class="close" style="position: inherit; padding: inherit" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      </div>
    </div>
  @endif
</header>

<main>
  @yield('content')
</main>

<footer class="bg-light">
  <div class="container align-items-center row py-2 mx-auto">
    <div class="col text-left">
      © 2018 SegFault
    </div>
    <div class="col text-center">
      <a class="" href="index.html">
        <img src="{{ asset('img/logo.png') }}" width="50" height="50" class="d-inline-block align-center" alt="Segfault Logo">
      </a>
    </div>
    <div class="col text-right">
      <a class="nav-link" href="about.html">
        About us
      </a>
    </div>
  </div>
</footer>

<!-- Optional JavaScript -->
<!-- jQuery first, then Popper.js, then Bootstrap JS -->
<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
        crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
        crossorigin="anonymous"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
        crossorigin="anonymous"></script>
<script src="https://apis.google.com/js/platform.js" async defer></script>

</body>

</html>
