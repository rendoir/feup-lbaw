@extends('layouts.app')

@section('title', 'Tags')

@section('content')

    <main class="container mt-5">

        <section id="category-header" class="d-flex flex-row justify-content-between mb-3">
            <div class="mb-4 ml-5">
                <h2>
                    Category Cloud
                </h2>
            </div>

            <!-- Search Bar -->
            <div class="input-group mb-4 w-50 mr-5">
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
                        <a href="/questions?search=[{{$tag->name}}]">{{$tag->name}}</a>
                        <span>{{$tag->num_posts}}</span>
                    </li>
                @endforeach

            </ul>
        </div>
    </main>

@endsection
