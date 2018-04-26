@extends('layouts.app')

@section('title', 'Error')

@section('content')

<div class="text-center">
    <section class="jumbotron jumbotron-fluid" id="jumbotron-error">
        <img src="{{ asset('img/error.jpg') }}" class="img-fluid my-5" alt="Responsive image">
    </section>

    <div class="pt-2 pb-3 pl-3">
        <h4 id="error-text">
            A Segmentation Fault occurred when trying to load the page!
            <br> It must mean the page does not exist...
        </h4>
    </div>

    <a class="btn btn-lg btn-primary mt-2 mb-5" href="{{ route('recent_questions') }}" role="button"> Get back to Home Page</a>
</div>

@endsection