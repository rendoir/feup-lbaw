@extends('layouts.app')

@section('content')

@if (session('status'))
<div class="alert alert-success alert-dismissible m-0" style="width: 100%" role="alert">
  <div class="container">
    <div class="d-flex justify-content-between">
      <div>{{ session('status') }}</div>
      <button type="button" class="close" style="position: inherit; padding: inherit" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </div>
</div>
@endif

<div class="container">
  <form class="form-horizontal" method="POST" action="{{ route('password.email') }}">
      {{ csrf_field() }}

      <div class="pt-4 pb-3 pl-3">
          <h2>
              Reset Password
          </h2>
      </div>

      <div class="form-group">
          <label for="email" class="col-md-4 control-label">E-Mail Address</label>

          <div class="col-md-6">
              <input id="email" type="email" class="form-control" name="email" value="{{ old('email') }}" required>
          </div>
      </div>

      <div class="form-group">
          <div class="col-md-6 col-md-offset-4">
              <button type="submit" class="btn btn-primary">
                  Send Password Reset Link
              </button>
          </div>
      </div>
  </form>
</div>
@endsection
