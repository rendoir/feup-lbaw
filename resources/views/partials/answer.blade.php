<?php
    $message = $answer->message;
    $content = $message->message_version;
    $author = $message->get_author();
    $score = $message->score;
?>
<!-- Answer -->
<div class="card my-3 question-answer-nlogged border-success">
    <div class="row mx-0">
        <div class="col-1 d-flex flex-column align-items-start">
            <div class="p-2 mt-3 mb-auto">
                <i class="fas fa-trophy"></i>
                <p class="text-center mb-0 w-100"><?=$score?></p>
            </div>
        </div>
        <div class="col-11">
            <div class="card-body">
                <p class="card-text">
                    <?=$content->content?>

                    @if ($message->was_edited())
                        <span class="badge badge-light float-right mr-2 mt-3">Edited</span>
                    @endif
                </p>
            </div>
            <div class="card-footer bg-transparent d-flex justify-content-between">
                <p class="card-text mb-0">
                    <small class="text-muted">Created by - &nbsp</small>
                </p>
                <div class="mr-auto">
                    <span><?=$author->username?></span>
                    <span class="badge badge-success"><?=$author->getBadge()?></span>
                </div>
                <div class="text-center m-auto">
                    <a role="button" data-toggle="collapse" href="#AnswerComments1" aria-expanded="false" aria-controls="AnswerComments1">
                        Show Comments
                    </a>
                </div>
                <div class="ml-auto">
                    <p class="text-right mb-0">4 comments</p>
                </div>
            </div>
        </div>
    </div>
    <!-- COMMENTS -->
    <div class="collapse" id="AnswerComments1">
        <div class="card-footer comments-card">
            <div class="d-flex list-group list-group-flush">
                <div class="list-group-item px-0 bg-transparent">
                    <div class="row mx-sm-0">
                        <div class="col-1 my-auto text-center">
                            <p class="text-center mb-0 w-100">3</p>
                        </div>
                        <div class="col-11 my-1 pl-3">
                            <p class="px-2">lorem ipsum is a filler text commonly used to demonstrate the textual elements
                                of a graphic document or visual presentation. Replacing content with
                                placeholder text allows designers to design the form of the content before
                                the content itself has been produced.</p>
                            <p class="text-right discrete">
                                AndreFCruz
                            </p>
                        </div>
                    </div>
                </div>
                <div class="list-group-item px-0 bg-transparent">
                    <div class="row mx-sm-0">
                        <div class="col-1 my-1 text-center">
                            <p class="text-center mb-0 w-100">1</p>
                        </div>
                        <div class="col-11 my-1 pl-4">
                            <p>Etiam semper lacus eu dolor dictum, a odio laoreet. Praesent luctus hendrerit
                                dapibus.
                            </p>
                            <p class="text-right discrete">
                                jflcarvalho
                            </p>
                        </div>
                    </div>
                </div>
                <div class="list-group-item px-0 bg-transparent">
                    <div class="row mx-sm-0">
                        <div class="col-1 my-auto text-center">
                            <p class="text-center mb-0 w-100">1</p>
                        </div>
                        <div class="col-11 my-auto pl-4">
                            <p>This is a sample comment!! *Insert meme here*</p>
                            <p class="text-right discrete">
                                EdgarACarneiro
                            </p>
                        </div>
                    </div>
                </div>
                <div class="list-group-item px-0 bg-transparent">
                    <div class="row mx-sm-0">
                        <div class="col-1 my-auto text-center">
                            <p class="text-center mb-0 w-100">-1</p>
                        </div>
                        <div class="col-11 my-auto pl-4">
                            <p>Etiam semper lacus eu dolor dictum, a dictum odio laoreet. Praesent luctus
                                hendrerit dapibus. Bada badu badumtsss.</p>
                            <p class="text-right discrete">
                                rendoir
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- COMMENTS END -->
</div>