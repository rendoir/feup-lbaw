@extends('layouts.app')

@section('title', 'Account settings')

@section('content')
    <main class="container mt-5">
        <div class="pb-4 pl-5">
            <h2>
                Account Settings
            </h2>
        </div>

        <section class="card">
            <div id="account-settings" class="row text-center">

                <div class="col-4 py-4">
                    <h4>
                        Credentials
                    </h4>
                </div>
                <div class="w-100"></div>

                <!-- Email -->
                <div class="col-2 pb-2">
                    E-mail
                </div>
                <div class="col-8 pb-2">
                    {{$user->email}}
                </div>

                <div class="w-100 mt-3"></div>

            @if (!$user->isRegisteredByAPI())
                <!-- Password Change -->
                    <div class="col-2 pb-2">
                        Password
                    </div>
                    <div class="col-8 pb-2">
                        Remember to change your password frequently!
                    </div>
                    <div class="px-3" data-toggle="collapse" href="#editPassword" role="button" aria-expanded="false" aria-controls="editPassword">
                        <button type="button" class="btn btn-outline-info">Change</button>
                    </div>

                    <div class="collapse rounded w-100 bg-light px-4 pt-4 pb-3 box-shadow" id="editPassword">
                        <div class="input-group mt-2 mb-4">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="basic-addon1">Old Password</span>
                            </div>
                            <input id="old_password" type="password" class="form-control" placeholder="Old" aria-label="Username" aria-describedby="basic-addon1">
                        </div>
                        <div class="input-group mb-4">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="basic-addon1">New Password</span>
                            </div>
                            <input id="new_password" type="password" class="form-control" placeholder="New" aria-label="Username" aria-describedby="basic-addon1">
                        </div>
                        <div class="input-group mb-2">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="basic-addon1">Repeat new Password</span>
                            </div>
                            <input id="repeat_new_password" type="password" class="form-control" placeholder="New" aria-label="Username" aria-describedby="basic-addon1">
                        </div>
                        <div class="text-center">
                            <button id="update_password" class="btn btn-info mt-3 mb-1" type="button">
                                <span class="pr-1">
                                    <i class="far fa-save"></i>
                                </span>
                                Update Password
                            </button>
                        </div>
                    </div>
                @else
                    <div class="col-2 pb-2">
                        Platform
                    </div>
                    <div class="col-8 pb-2">
                        {{$user->provider}}
                    </div>
                @endif

                <div class="w-100 mt-3"></div>

            </div>
        </section>

        <div class="text-center">
            <a class="btn btn-primary my-5" href="{{ route('profile', ['username' => $user->username]) }}" role="button">Get back to Profile</a>
        </div>
    </main>

    @include('templates.alerts')
@endsection
