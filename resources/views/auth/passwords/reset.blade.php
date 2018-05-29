@extends('layouts.app')

@section('title', 'Reset Password ')

@section('content')
    <section id="login-page">
        <div class="limiter">
            <div class="container-login100" style="min-height: {{'calc(100vh - 66px - 3.5em);'}}";>

                <div class="wrap-login100">
                    <form class="login100-form validate-form" method="POST" action="{{ route('password.request') }}">
                        {{ csrf_field() }}

                        <input type="hidden" name="token" value="{{ $token }}">

                        <span class="login100-form-title p-b-26">
						    Reset Password
					    </span>
                        <span class="login100-form-title p-b-48">
						    <i class="zmdi zmdi-font"></i>
					    </span>


                        <div class="mt-4 wrap-input100 validate-input {{ $errors->has('email') ? ' has-error' : '' }}" data-validate = "Valid email is: a@b.c">
                            <input id="email" type="text" class="input100" name="email" value="{{ old('email') }}" placeholder="Email" required>
                            <span class="focus-input100" data-placeholder="Email"></span>
                        </div>

                        <div class="wrap-input100 validate-input {{ $errors->has('password') ? ' has-error' : '' }}" data-validate="Enter password">
						<span class="btn-show-pass">
							<i class="zmdi zmdi-eye"></i>
						</span>
                            <input id="password" type="password" class="input100" name="password" placeholder="New Password" required>
                            <span class="focus-input100" data-placeholder="New Password"></span>
                        </div>

                        <div class="wrap-input100 validate-input {{ $errors->has('password') ? ' has-error' : '' }}" data-validate="Enter password">
						<span class="btn-show-pass">
							<i class="zmdi zmdi-eye"></i>
						</span>
                            <input id="password-confirm" type="password" class="input100" name="password_confirmation" placeholder="Confirm Password" required>
                            <span class="focus-input100" data-placeholder="Confirm Password"></span>
                        </div>

                        @if ($errors->has('email'))
                            <div class="help-block">
                                <strong class="text-danger">{{ $errors->first('email') }}</strong>
                            </div>
                        @endif

                        @if ($errors->has('password'))
                            <div class="help-block">
                                <strong class="text-danger">{{ $errors->first('password') }}</strong>
                            </div>
                        @endif

                        <div class="container-login100-form-btn">
                            <div class="wrap-login100-form-btn">
                                <div class="login100-form-bgbtn"></div>
                                <button class="login100-form-btn">
                                    Send Reset Request
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
@endsection
