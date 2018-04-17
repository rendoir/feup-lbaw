@extends('layouts.app')

@section('content')
<form id="signin_form" class="px-4 py-3" method="POST" action="{{ route('login') }}">
    {{ csrf_field() }}
    <div class="form-gruoup">
        <label for="email">E-mail</label>
        <input id="email" class="form-control" type="text" name="email"  placeholder="email@example.com" value="{{ old('email') }}" required autofocus>
        @if ($errors->has('email'))
            <span class="error">
                {{ $errors->first('email') }}
            </span>
        @endif
    </div>

    <div class="form-group">
        <label for="password" >Password</label>
        <input id="password" class="form-control" type="password" name="password" placeholder="Password" required>
        @if ($errors->has('password'))
            <!-- TODO: Notification about login error -->
            <span class="error">
                {{ $errors->first('password') }}
            </span>
        @endif
    </div>

    <div class="form-check">
        <label>
            <input type="checkbox" name="remember" {{ old('remember') ? 'checked' : '' }}> Remember Me
        </label>
    </div>

    <button id="login" type="submit" class="btn btn-primary btn-signin">Sign in</button>
    <a class="btn btn-social btn-github" href="#">
        <i class="fab fa-github"></i>
        <div>Sign in with Github</div>
    </a>

    <div class="mx-auto mt-1">
        <div class="g-signin2" data-onsuccess="onSignIn" data-width="200" data-height="34" data-longtitle="true">button</div>
    </div>
</form>

<div class="dropdown-divider"></div>
<a class="dropdown-item" href="{{ route('register') }}">New around here? Sign up</a>

@endsection
