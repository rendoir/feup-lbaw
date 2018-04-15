@extends('layouts.app')

@section('title', 'About')

@section('content')

<section class="container-fluid px-0">
    <div class="jumbotron jumbotron-fluid mb-0" id="jumbotron_about">
        <div class="container text-dark d-flex flex-column" style="height: 100%;">
            <div class="p-2 mb-5">
                <h1 class="display-4">Welcome to Seg
                    <i>Fault</i>
                </h1>
                <p class="lead">A community for
                    <i>learning</i>. A community for
                    <i>teaching</i>.</p>
            </div>

            <div class="p-2 mb-5 align-self-stretch">
                <blockquote class="blockquote text-right">
                    <p class="mb-0">Tell me and I forget. Teach me and I remember. Involve me and I learn.</p>
                    <footer class="blockquote-footer">Benjamin Franklin</footer>
                </blockquote>
            </div>

            <h2>The Team</h2>
        </div>

        <div class="d-flex text-center justify-content-center">
            <div class="card m-2" style="width: 18rem;">
                <img class="card-img-top" src="{{ asset('img/profile_andre.jpg') }}" alt="Card image cap">
                <div class="team-sentences card-body">
                    <h4 class="card-title">André Cruz</h4>
                    <p class="card-text">Pls let us use node.js, we won't use ORMs :^)</p>
                </div>
            </div>

            <div class="card m-2" style="width: 18rem;">
                <img class="card-img-top" src="{{ asset('img/profile_joao.jpg') }}" alt="Card image cap">
                <div class="team-sentences card-body">
                    <h4 class="card-title">João Carvalho</h4>
                    <p class="card-text">Come to ENEI!</p>
                </div>
            </div>

            <div class="card m-2" style="width: 18rem;">
                <img class="card-img-top" src="{{ asset('img/profile_edgar.jpg') }}" alt="Card image cap">
                <div class="team-sentences card-body">
                    <h4 class="card-title">Edgar Carneiro</h4>
                    <p class="card-text">I've read the bible.</p>
                </div>
            </div>

            <div class="card m-2" style="width: 18rem;">
                <img class="card-img-top" src="{{ asset('img/profile_daniel.png') }}" alt="Card image cap">
                <div class="team-sentences card-body">
                    <h4 class="card-title">Daniel Marques</h4>
                    <p class="card-text">I play too much assassins creed...</p>
                </div>
            </div>
        </div>

    </div>

</section>

@endsection