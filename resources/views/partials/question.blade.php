<a class="card my-3 question-card" href="question.html">
    <div class="row mx-0">
        <div class="col-sm-2 py-3 border-right rounded-left d-flex flex-column justify-content-around bg-light">
            <div>
                <div>
                    <p class="text-center font-weight-bold mb-0 w-100">Answers</p>
                    <p class="text-center mb-0 w-100">15</p>
                </div>
            </div>
            <div>
                <div class="row mx-0">
                    <p class="text-center font-weight-bold mb-2 w-100">Votes</p>
                    <p class="text-center mb-0 w-100">5</p>
                </div>
            </div>
        </div>
        <div class="col-sm-10">
            <div class="card-body">
                <?php
                    $message = $question->message;
                    $content = $message->message_version;
                    $author = $message->get_author();
                ?>
                <h5 class="card-title"><?=$question->title?></h5>

                <p class="card-text"><?=$content->content?></p>
            </div>
            <div class="card-footer bg-transparent d-flex justify-content-between">
                <p class="card-text mb-0">
                    <small class="text-muted">Created by - &nbsp</small><?=$author->username?>
                </p>
                <div class="mr-auto">
                    <span></span>
                    <span class="badge badge-success">Trusted</span>
                </div>
                <div>
                    @each('partials.category', $message->categories, 'category')
                </div>
            </div>
        </div>
    </div>
</a>
