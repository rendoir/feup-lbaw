@verbatim
<template id="minProfile">
    <a href="/users/{{username}}" class="card unnoticed-a hover-box-shadow mb-3">
        <div class="card-img-top-container" style="background-image: url({{bg-profile-img}}); background-size: cover; background-position: center;"></div>
        <div class="card-body text-center" style="z-index: 1">
            <div class="rounded-circle img-profile-aside mx-auto" style="background-image: url({{profile-img}})"></div>
            <h3 class="card-text mb-0">{{username}}</h3>
            {{#have_badge}}
            <span class="badge badge-success mb-3">{{badge}}</span>
            {{/have_badge}}
            <div class="my-3">
                <i class="fas fa-trophy"></i>
                <span>{{reputaion}}</span>
            </div>
            <div class="row">
                <div class="col-4 px-1 border-right">
                    <div>{{questions_points}}</div>
                    <small>Questions</small>
                </div>
                <div class="col-4 px-1">
                    <div>{{answers_points}}</div>
                    <small>Answers</small>
                </div>
                <div class="col-4 px-1 border-left">
                    <div>{{comments_points}}</div>
                    <small>Comments</small>
                </div>
            </div>
        </div>
    </a>
</template>
@endverbatim