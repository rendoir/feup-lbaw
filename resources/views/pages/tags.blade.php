@extends('layouts.app')

@section('title', 'Tags')

@section('content')

    <main class="container mt-5">

        <section id="category-header" class="row align-items-center">
            <div class="col-sm-4">
                <h2 class="mx-auto">
                    Category Cloud
                </h2>
            </div>

            <!-- Search Bar -->
            <div class="input-group col-sm-8">
                <div class="input-group-prepend">
                    <span class="input-group-text btn btn-primary" id="basic-addon1">Search your Category here</span>
                </div>
                <input id="tag_search" type="text" class="form-control" placeholder="e.g. javascript" aria-label="Username" aria-describedby="basic-addon1">
            </div>

        </section>

        <!-- TagCloud -->
        <div class="tagcloud text-center mt-2 mb-4">
            <ul>

                @foreach($tags as $tag)
                    <li>
                        <a href="/questions?search=%5B{{$tag->name}}%5D">{{$tag->name}}</a>
                        <span>{{$tag->num_posts}}</span>
                    </li>
                @endforeach

            </ul>
        </div>
    </main>

@endsection
