@verbatim
<template id="minProfile">
    <a href="/users/{{username}}" class="card unnoticed-a hover-box-shadow mb-3">
        <div class="card-img-top-container">
            <img class="card-img-top" src="{{bg-profile-img}}" alt="Card image cap">
        </div>
        <div class="card-body text-center" style="z-index: 1">
            <img class="rounded-circle img-profile-aside" src="{{profile-img}}" alt="UserImage" height="100px" width="100px">
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