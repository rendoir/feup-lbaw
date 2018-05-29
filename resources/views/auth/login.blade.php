@extends('layouts.head')

@section('body')
    <body id="login-page">
    <div class="limiter">
        <div class="container-login100">
            <div class="wrap-login100">
                <form class="login100-form validate-form" method="POST" action="{{ route('login') }}">
                    {{ csrf_field() }}
                    <span class="login100-form-title p-b-26">
						Welcome
					</span>
                    <span class="login100-form-title p-b-48">
						<i class="zmdi zmdi-font"></i>
					</span>


                    <div class="wrap-input100 validate-input {{ $errors->has('email') ? ' has-error' : '' }}" data-validate = "Valid email is: a@b.c">
                        <input id="email" type="text" class="input100" name="email" value="{{ old('email') }}" placeholder="Email" required>
                        <span class="focus-input100" data-placeholder="Email"></span>
                    </div>

                    <div class="wrap-input100 validate-input {{ $errors->has('password') ? ' has-error' : '' }}" data-validate="Enter password">
						<span class="btn-show-pass">
							<i class="zmdi zmdi-eye"></i>
						</span>
                        <input id="password" type="password" class="input100" name="password" placeholder="Password" required>
                        <span class="focus-input100" data-placeholder="Password"></span>
                    </div>

                    @if ($errors->has('email'))
                        <span class="help-block">
                        <strong>{{ $errors->first('email') }}</strong>
                        </span>
                    @endif

                    @if ($errors->has('password'))
                        <span class="help-block">
                        <strong>{{ $errors->first('password') }}</strong>
                        </span>
                    @endif

                    <div class="container-login100-form-btn">
                        <div class="wrap-login100-form-btn">
                            <div class="login100-form-bgbtn"></div>
                            <button class="login100-form-btn">
                                Login
                            </button>
                        </div>
                    </div>

                    <div class="text-center p-t-115">
						<span class="txt1">
							Don’t have an account?
						</span>

                        <a class="txt2" href="{{ route('register') }}" style="hover: none">
                            Sign Up
                        </a>
                    </div>

                    <div class="text-center p-t-115">
                        <a class="btn btn-link txt1" href="{{ route('password.request') }}">
                            Forgot Your Password?
                        </a>
                    </div>

                </form>

                <div class="d-inline-flex justify-content-around mt-1" id="external-signins">
                    <button class="btn btn-social p-1" href="{{ url('/auth/github') }}">
                        <i class="fab fa-github"></i>
                        &nbsp;GitHub
                    </button>
                    <button class="btn btn-social p-1" href="{{ url('/auth/google') }}">
                        <i class="fab fa-google"></i>
                        &nbsp;Google
                    </button>
                </div>

            </div>
        </div>
    </div>
    </body>
@endsection
