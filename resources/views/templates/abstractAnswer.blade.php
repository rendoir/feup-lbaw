@verbatim
{{^is_authenticated}}
<div class="card my-3">
    <div class="row mx-0">
        <div class="col-1 d-flex flex-column align-items-start">
            <div class="p-2 mt-3 mb-auto">
                <i class="fas fa-trophy"></i>
                <p class="text-center mb-0 w-100">{{score}}</p>
            </div>
        </div>
        <div class="col-11">
            <div class="card-body">
                <p class="card-text">
                    {{content.version}}

                    {{#was_edited}}
                        <span class="badge badge-light float-right mr-2 mt-3">Edited</span>
                    {{/was_edited}}
                </p>
            </div>
            <div class="card-footer bg-transparent d-flex justify-content-between">
                <p class="card-text mb-0">
                    <small class="text-muted">Created by - &nbsp</small>
                </p>
                <div class="mr-auto">
                    <span>{{author}}</span>
                    <!--<span class="badge badge-success">{{$author->getBadge()-->
                </div>
                <div class="text-center m-auto">
                    <!--@if ($num_comments > 0)
                        <a class="show-comments" role="button" data-toggle="collapse" href="#AnswerComments{{id}}" 
                        aria-expanded="false" aria-controls="AnswerComments{{id}}" data-message-id="{{id}}">
                            Show Comments
                        </a>-->
                    <!--@elseif (Auth::Check())
                        <a class="show-comments" role="button" data-toggle="collapse" href="#AnswerComments{{id}}" 
                        aria-expanded="false" aria-controls="AnswerComments{{id}}" data-message-id="{{id}}">
                            Add Comment
                    </a>
                    @endif-->
                </div>
                <div class="ml-auto">
                    <p class="text-right mb-0">{{num_comments}} comments</p>
                </div>
            </div>
        </div>
    </div>
    <!--@if (Auth::check())-->
    <!-- COMMENTS -->
    <!--<div class="collapse answer-comments" id="AnswerComments{{$id}}" data-message-id="{{$id}}">
        
        <!--<div class="comment-creator card-footer comments-card px-0 px-sm-4">
            <div class="d-flex list-group list-group-flush">
                <div class="list-group-item bg-transparent">
                    <div class="input-group mt-3">
                        <input class="form-control new-comment-content" placeholder="New Comment" aria-label="New Comment" aria-describedby="basic-addon2" type="text" data-message-id="{{$id}}">
                        <div class="input-group-append">
                            <button class="btn btn-outline-success new-comment-submit" type="button" data-message-id="{{$id}}">Add Comment</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>-->
    <!--@elseif ($num_comments > 0)
    <div class="collapse answer-comments" id="AnswerComments{{$id}}" data-message-id="{{$id}}"></div>
    @endif-->
</div>

{{/is_authenticated}}

{{#is_authenticated}}
<div class="card my-3">
    <div class="row mx-0">
        <div class="col-2 col-sm-1 py-3 d-flex flex-column align-items-center justify-content-between">
            <div class="p-2">
                <i class="fas fa-trophy"></i>
                <p class="text-center mb-0 w-100">{{score}}</p>
            </div>
            {{^is_owner}}
            <div class="d-flex flex-column justify-content-around mb-sm-n-100">
                <a href="#">
                    <i class="fas fa-arrow-up"></i>
                </a>
                <a href="#">
                    <i class="fas fa-arrow-down discrete"></i>
                </a>
            </div>
            {{/is_owner}}
            {{#is_question_owner}}
            <div class="mb-sm-n-100 mt-3">
                <button type="button" class="btn btn-outline-success ml-1" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="Mark answer as correct">
                    <i class="fas fa-check"></i>
                </button>
            </div>
            {{/is_question_owner}}
        </div>
        <div class="col-10 col-sm-11 pl-0 pl-sm-3 ">
            <div class="card-body p-1 p-sm-4">
                <p class="card-text">
                {{content.version}}

                {{#was_edited}}
                    <span class="badge badge-light float-right mr-2 mt-1">Edited</span>
                {{/was_edited}}
                </p>
            </div>
        </div>
    </div>
    <div class="row mx-0">
        <div class="col-sm-11 ml-auto">
            <div class="card-footer bg-transparent d-flex align-items-baseline justify-content-between">
                <div class="text-center">
                    <small class="text-muted">Created by -</small>
                    <span>{{author}}</span>
                    <span class="badge badge-success">Trusted</span>
                </div>
                <div class="text-center m-auto">
                    <a role="button" data-toggle="collapse" href="#AnswerComments1" aria-expanded="false" aria-controls="AnswerComments1">
                        Show Comments
                    </a>
                </div>
                <small class="ml-auto mr-1 text-center mt-auto mb-auto">
                    {{#is_owner}}
                    <a class="discrete mx-1" href="#" role="button" data-toggle="tooltip" data-placement="top" title="" data-original-title="Edit">
                        <i class="fas fa-pencil-alt"></i>
                    </a>
                    <a class="discrete ml-1" data-toggle="modal" href="#deleteModal">
                        <i class="far fa-trash-alt" data-toggle="tooltip" data-placement="top" title="" data-original-title="Delete"></i>
                    </a>
                    {{/is_owner}}

                    {{^is_owner}}
                    <a class="discrete" href="#" role="button" data-toggle="tooltip" data-placement="top" title="" data-original-title="Report">
                        <i class="fas fa-exclamation-triangle"></i>
                    </a>
                    {{/is_owner}}
                </small>
            </div>
        </div>
        <div class="collapse" id="AnswerComments-1">
            <div class="card-footer comments-card px-0 px-sm-4">
            </div>
        </div>
    </div>
</div>

{{/is_authenticated}}
@endverbatim