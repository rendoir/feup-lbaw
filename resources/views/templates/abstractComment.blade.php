@verbatim
{{^is_authenticated}}
<div class="list-group-item px-0 bg-transparent comment {{#banned}}banned{{/banned}}">
    <div class="mx-sm-0 row">
        <div class="col-1 my-auto text-center">
            <p class="text-center mb-0 w-100">{{score}}</p>
        </div>
        <div class="pl-3 my-1 col-11">
            <p class="px-2">
                {{content.version}}
            </p>
            <div class="text-right">
                <a class="discrete" href="/users/{{author}}">{{author}}</a>
            </div>
        </div>
    </div>
</div>
{{/is_authenticated}}

{{#is_authenticated}}
    {{#is_owner}}
    <div class="list-group-item pr-3 bg-transparent comment {{#banned}}banned{{/banned}}">
        <div class="mx-sm-0">
            <p class="editable-content" data-message-id='{{id}}'>
                {{content.version}}
            </p>
            <div class="d-flex flex-wrap mt-3">
                <p class="discrete mr-2">{{score}}</p>
                <span class="discrete mx-1">
                    <pi class="fas fa-trophy"></pi>
                </span>
                <span class="discrete mx-2">│</span>
                <small class="my-auto">
                    <button class="btn btn-link discrete mx-1 p-0 edit-comments" data-toggle="tooltip" data-placement="top" title=" " data-original-title="Edit" data-message-id='{{id}}'>
                        <i class="fas fa-pencil-alt"></i>
                    </button>
                    <button class="btn btn-link discrete mx-1 p-0" data-toggle="modal" href="#deleteCommentModal" data-message-id='{{id}}'>
                        <i class="far fa-trash-alt" data-toggle="tooltip" data-placement="top" title="" data-original-title="Delete"></i>
                    </button>
                </small>
                <a class="ml-auto discrete" href="/users/{{author}}">{{author}}</a>
            </div>
        </div>
    </div>
    {{/is_owner}}

    {{^is_owner}}
    <div class="list-group-item bg-transparent comment {{#banned}}banned{{/banned}}">
        {{#is_mod}}<p class="editable-content" data-message-id='{{id}}'>{{/is_mod}}
        {{^is_mod}}<p>{{/is_mod}}
            {{content.version}}
        </p>
        <div class="d-flex flex-wrap mt-3">
            <i class="vote fas fa-arrow-up p-0 {{discrete_p}}" data-positive="true" data-message_id="{{id}}"></i>
            <span class="score mx-2 discrete">{{score}}</span>
            <i class="vote fas fa-arrow-down p-0 {{discrete_n}}" data-positive="false" data-message_id="{{id}}"></i>
            <span class="ml-1 mr-2 discrete">│</span>
            <small class="my-auto">
                <button class="btn btn-link p-0 report {{discrete_r}}" data-toggle="tooltip" data-placement="top" title="" data-original-title="Report" data-message_id='{{id}}'>
                    <i class="fas fa-exclamation-triangle"></i>
                </button>
                {{#is_mod}}
                <button class="btn btn-link discrete ml-2 mr-1 p-0 edit-comments" data-toggle="tooltip" data-placement="top" title=" " data-original-title="Edit" data-message-id='{{id}}'>
                    <i class="fas fa-pencil-alt"></i>
                </button>
                <button class="btn btn-link discrete mx-1 p-0" data-toggle="modal" href="#deleteCommentModal" data-message-id='{{id}}'>
                    <i class="far fa-trash-alt" data-toggle="tooltip" data-placement="top" title="" data-original-title="Delete"></i>
                </button>
                {{/is_mod}}
            </small>
            <a class="ml-auto discrete" href="/users/{{author}}">{{author}}</a>
        </div>
    </div>
    {{/is_owner}}
{{/is_authenticated}}
@endverbatim
