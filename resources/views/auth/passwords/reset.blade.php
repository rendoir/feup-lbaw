@extends('layouts.app')

@section('content')
<div class="container">
  <form class="form-horizontal" method="POST" action="{{ route('password.request') }}">
      {{ csrf_field() }}

      <div class="pt-4 pb-3 pl-3">
          <h2>
              Reset Password
          </h2>
      </div>

      <input type="hidden" name="token" value="{{ $token }}">

      <div class="form-group">
          <label for="email" class="col-md-4 control-label">E-Mail Address</label>

          <div class="col-md-6">
              <input id="email" type="email" class="form-control" name="email" value="{{ $email or old('email') }}" required autofocus>
          </div>
      </div>

      <div class="form-group">
          <label for="password" class="col-md-4 control-label">Password</label>

          <div class="col-md-6">
              <input id="password" type="password" class="form-control" name="password" required>
          </div>
      </div>

      <div class="form-group">
          <label for="password-confirm" class="col-md-4 control-label">Confirm Password</label>
          <div class="col-md-6">
              <input id="password-confirm" type="password" class="form-control" name="password_confirmation" required>
          </div>
      </div>

      <div class="form-group">
          <div class="col-md-6 col-md-offset-4">
              <button type="submit" class="btn btn-primary">
                  Reset Password
              </button>
          </div>
      </div>
  </form>
</div>
@endsection
