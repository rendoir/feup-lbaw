@extends('layouts.app')

@section('title', 'Main')

@section('content')

    <section class="container">

        <!-- Nav With Separators -->
        <div class="row mt-3">
            <div class="nav nav-tabs col-md-9" id="nav-tab" role="tablist">
                <a class="nav-item nav-link active" id="nav-new-tab" aria-controls="nav-new" aria-selected="true"
                   href="@if(isset($type) && strcmp($type, 'recent') != 0){{ url('/questions/recent/0') }}@else{{ "#" }}@endif">Recent</a>
                <a class="nav-item nav-link" id="nav-hot-tab" href="#nav-hot" aria-controls="nav-hot" aria-selected="false">Hot</a>
                <a class="nav-item nav-link" id="nav-voted-tab" aria-controls="nav-voted" aria-selected="false"
                   href="@if(isset($type) && strcmp($type, 'highly-voted') != 0){{ url('/questions/highly-voted/0') }}@else{{ "#" }}@endif">Highly Voted</a>
                <a class="nav-item nav-link" id="nav-active-tab" href="#nav-active" role="tab" aria-controls="nav-active"
                   aria-selected="false">Active</a>
            </div>
        </div>

        <!-- Separators Contents -->
        <div class="row">
            <div class="tab-content col-md-9" id="nav-tabContent">
                <div class="tab-pane fade @if (isset($type) && strcmp($type, 'recent')) {{ "show active" }} @endif" id="nav-new" role="tabpanel" aria-labelledby="nav-new-tab">

                    <?php Log::debug($type); ?>

                    @if (isset($type) && strcmp($type, 'recent'))
                        @each('partials.question', $questions, 'question')
                    @endif

                </div>
                <div class="tab-pane fade" id="nav-hot" role="tabpanel" aria-labelledby="nav-hot-tab">


                </div>
                <div class="tab-pane fade @if (isset($type) && strcmp($type, 'highly-voted')) {{ "show active" }} @endif" id="nav-voted" role="tabpanel" aria-labelledby="nav-voted-tab"
                    @if (isset($type) && strcmp($type, 'highly-voted') == false) {{ 'href="/questions/highly-voted/0"' }} @endif>


                @if (isset($type) && strcmp($type, 'highly-voted'))
                        @each('partials.question', $questions, 'question')
                    @endif

                </div>
                <div class="tab-pane fade" id="nav-active" role="tabpanel" aria-labelledby="nav-active-tab">

                </div>
            </div>
            <aside class="col-md-3 mb-3">
                <div class="aside-content  pt-3">
                    <div id="ask-sign-in" class="card">
                        <form class="px-4 py-3" action="ask_question.html">
                            <div class="form-group">
                                <label for="exampleDropdownFormEmail">Email address</label>
                                <input type="email" class="form-control" id="exampleDropdownFormEmail" placeholder="email@example.com">
                            </div>
                            <div class="form-group">
                                <label for="exampleDropdownFormPassword">Password</label>
                                <input type="password" class="form-control" id="exampleDropdownFormPassword" placeholder="Password">
                            </div>
                            <div class="form-check">
                                <input type="checkbox" class="form-check-input" id="dropdownCheck_ask">
                                <label class="form-check-label" for="dropdownCheck_ask">Remember me</label>
                            </div>
                            <button type="submit" class="btn btn-primary btn-signin">Sign in</button>
                            <a class="btn btn-social btn-github" href="#">
                                <i class="fab fa-github"></i>
                                <div>Sign in with Github</div>
                            </a>
                            <div class="mx-auto mt-1 d-flex">
                                <div class="g-signin2" data-onsuccess="onSignIn" data-width="200" data-height="34" data-longtitle="true">button</div>
                            </div>
                        </form>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="sign-up.html">New around here? Sign up</a>
                    </div>
                    <div class="card">
                        <div class="card-body d-flex flex-column justify-content-center">
                            <h5 class="card-title">Have a Question?</h5>
                            <form id="form_ask_question" name="ask_question">
                                <div class="input-group mb-3">
                                    <input type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default">
                                </div>
                                <button type="submit" class="btn btn-outline-info w-100">Ask!</button>
                            </form>
                        </div>
                    </div>
                </div>
            </aside>
        </div>

    </section>


@endsection