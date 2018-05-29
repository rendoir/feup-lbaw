@extends('layouts.app')

@section('title', 'Reset Password')

@section('content')
    <section id="login-page">
    <div class="limiter">
        <div class="container-login100" style="min-height: {{'calc(100vh - 66px - 3.5em);'}}";>

            <div class="wrap-login100">
                <form class="login100-form validate-form" method="POST" action="{{ route('password.email') }}">
                    {{ csrf_field() }}
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

                    @if ($errors->has('email'))
                        <span class="help-block">
                        <strong>{{ $errors->first('email') }}</strong>
                        </span>
                    @endif

                    @if (session('status'))
                        <span class="help-block">
                        <strong class="text-success">{{ session('status') }}</strong>
                        </span>
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
