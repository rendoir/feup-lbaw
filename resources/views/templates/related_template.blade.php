@verbatim
    <template id="related">
        {{#questions}}
        <div class="card question-card border-success {{#correct_answer}}border-success{{/correct_answer}} my-2" onclick="location.href='/questions/{{question_id}}'" style="margin-bottom: -1px">
            <div class="card-body p-2">
                <span class="card-title">{{title}}</span>
            </div>
            <div class="card-footer p-2 bg-transparent">
                <div class="ml-2 mr-auto">
                    <a href="/users/{{author}}">{{author}}</a>
                    {{#have_badge}}
                    <span class="badge badge-success">{{badge}}</span>
                    {{/have_badge}}
                </div>
                <div>
                    {{#categories}}
                    <a class="badge badge-dark tag" href="/questions?search=[{{name}}]">{{name}}</a>
                    {{/categories}}
                </div>
            </div>
        </div>
        {{/questions}}
    </template>
@endverbatim