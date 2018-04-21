@extends('layouts.app')

@section('title', 'Main')

@section('content')

    <section class="container pt-3">

        <!-- Nav With Separators -->
        <div class="row">
            <div class="nav nav-tabs col-md-9" id="nav-tab" role="tablist">
                <a class="nav-item nav-link @if(isset($type) && strcmp($type, 'recent') == 0){{"active"}}@endif" id="nav-new-tab" aria-controls="nav-new" aria-selected="true"
                   href="@if(isset($type) && strcmp($type, 'recent') != 0){{ url('/questions/recent/0') }}@else{{ "#" }}@endif">Recent</a>
                <a class="nav-item nav-link @if(isset($type) && strcmp($type, 'hot') == 0){{"active"}}@endif" id="nav-hot-tab" aria-controls="nav-hot" aria-selected="false"
                   href="@if(isset($type) && strcmp($type, 'hot') != 0){{ url('/questions/hot/0') }}@else{{ "#" }}@endif">Hot</a>
                <a class="nav-item nav-link @if(isset($type) && strcmp($type, 'highly-voted') == 0){{"active"}}@endif" id="nav-voted-tab" aria-controls="nav-voted" aria-selected="false"
                   href="@if(isset($type) && strcmp($type, 'highly-voted') != 0){{ url('/questions/highly-voted/0') }}@else{{ "#" }}@endif">Highly Voted</a>
                <a class="nav-item nav-link @if(isset($type) && strcmp($type, 'active') == 0){{"active"}}@endif" id="nav-active-tab" aria-controls="nav-active" aria-selected="false"
                   href="@if(isset($type) && strcmp($type, 'active') != 0){{ url('/questions/active/0') }}@else{{ "#" }}@endif">Active</a>

            </div>
        </div>

        <!-- Separators Contents -->
        <div class="row">
            <div class="tab-content col-md-9" id="nav-tabContent">
                <div class="tab-pane fade @if(isset($type) && strcmp($type, 'recent') == 0){{"show active"}}@endif" id="nav-new" role="tabpanel" aria-labelledby="nav-new-tab"
                @if (isset($type) && strcmp($type, 'recent') == false) {{ 'href="/questions/recent/0"' }} @endif>

                    @if (isset($type) && strcmp($type, 'recent') == 0)
                        @each('partials.question', $questions, 'question')
                    @endif

                </div>

                <div class="tab-pane fade @if(isset($type) && strcmp($type, 'hot') == 0){{"show active"}}@endif" id="nav-hot" role="tabpanel" aria-labelledby="nav-hot-tab"
                @if (isset($type) && strcmp($type, 'hot') == false) {{ 'href="/questions/hot/0"' }} @endif>


                    @if (isset($type) && strcmp($type, 'hot') == 0)
                        @each('partials.question', $questions, 'question')
                    @endif

                </div>

                <div class="tab-pane fade @if(isset($type) && strcmp($type, 'highly-voted') == 0){{"show active"}}@endif" id="nav-voted" role="tabpanel" aria-labelledby="nav-voted-tab"
                @if (isset($type) && strcmp($type, 'highly-voted') == false) {{ 'href="/questions/highly-voted/0"' }} @endif>


                    @if (isset($type) && strcmp($type, 'highly-voted') == 0)
                        @each('partials.question', $questions, 'question')
                    @endif

                </div>

                <div class="tab-pane fade @if(isset($type) && strcmp($type, 'active') == 0){{"show active"}}@endif" id="nav-active" role="tabpanel" aria-labelledby="nav-active-tab"
                @if (isset($type) && strcmp($type, 'active') == false) {{ 'href="/questions/active/0"' }} @endif>


                    @if (isset($type) && strcmp($type, 'active') == 0)
                        @each('partials.question', $questions, 'question')
                    @endif

                </div>

                <div class="search-content">
                @if (isset($type) && strcmp($type, 'search') == 0)
                    @each('partials.question', $questions, 'question')
                @endif
                </div>

                <div class="d-flex justify-content-between">
                    <a <?php
                        $url = Request::url();
                        $page_number = intval(substr(strrchr($url, "/"), 1)) - 1;
                        if($page_number >= 0)
                            echo 'href="' . $page_number . '"';
                        ?>>Previous Page</a>
                    <span>Page Number: <?php
                        $url = Request::url();
                        $page_number = intval(substr(strrchr($url, "/"), 1));
                        echo $page_number;
                        ?></span>
                    <a href="<?php
                    $url = Request::url();
                    $page_number = intval(substr(strrchr($url, "/"), 1)) + 1;
                    echo $page_number;
                    ?>">Next Page</a>
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
                            <form id="form_ask_question" name="ask_question" action="{{ url('ask_question') }}">
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