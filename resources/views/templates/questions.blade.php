@verbatim
    <template id="questions">
        {{#questions}}
        <a class="card my-3 question-card {{#correct_answer}}border-success{{/correct_answer}}" href="/questions/{{question_id}}">
            <div class="row mx-0">
                <div class="col-sm-2 py-3 border-right rounded-left d-flex flex-column justify-content-around bg-light">
                    <div>
                        <div>
                            <p class="text-center font-weight-bold mb-0 w-100">Answers</p>
                            <p class="text-center mb-0 w-100">{{num_answers}}</p>
                        </div>
                    </div>
                    <div>
                        <div class="row mx-0">
                            <p class="text-center font-weight-bold mb-2 w-100">Votes</p>
                            <p class="text-center mb-0 w-100">{{score}}</p>
                        </div>
                    </div>
                </div>
                <div class="col-sm-10">
                    <div class="card-body">
                        <h5 class="card-title">{{title}}</h5>
                        <p class="card-text">{{preview}}...</p>
                    </div>
                    <div class="card-footer bg-transparent d-flex justify-content-between">
                        <p class="card-text mb-0">
                            <small>Created by -</small>
                        </p>
                        <div class="ml-2 mr-auto">
                            <span>{{author}}</span>
                            {{#have_badge}}
                                <span class="badge badge-success">{{badge}}</span>
                            {{/have_badge}}
                        </div>
                        <div>
                            {{#categories}}
                                <span class="badge badge-dark">{{name}}</span>
                            {{/categories}}
                        </div>
                    </div>
                </div>
            </div>
        </a>
        {{/questions}}
    </template>
@endverbatim