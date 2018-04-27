@verbatim
<template class="comment">

    {{^is_owner}}
    <div class="list-group-item px-0 bg-transparent">
        <div class="mx-sm-0 row">
            <div class="col-1 my-auto text-center">
                <p class="text-center mb-0 w-100">{{score}}</p>
            </div>
            <div class="pl-3 my-1 col-11">
                <p class="px-2">
                    {{content.version}}
                </p>
                <p class="discrete text-right">{{author}}</p>
            </div>
        </div>
    </div>
    {{/is_owner}}

    {{#is_owner}}
    <div class="list-group-item ml-5 pl-5 pr-3 bg-transparent">
        <div class="mx-sm-0">
            <p class="editable-content" data-message-id="{{comment.id}}">
                {{content.version}}
            </p>
            <div class="d-flex flex-wrap mt-3">
                <p class="discrete mr-2">{{score}}</p>
                <span class="discrete mx-1">
                    <pi class="fas fa-trophy"></pi>
                </span>
                <span class="discrete mx-2">│</span>
                <small class="my-auto">
                    <button class="btn btn-link discrete mx-1 p-0 edit-comments" data-toggle="tooltip" data-placement="top" title=" " data-original-title="Edit" data-message-id="{{comment.id}}">
                        <i class="fas fa-pencil-alt"></i>
                    </button>
                    <button class="btn btn-link discrete mx-1 p-0" data-toggle="tooltip" data-placement="top" title=" " data-original-title="Delete">
                        <i class="far fa-trash-alt"></i>
                    </button>
                </small>
                <p class="discrete ml-auto">teste123</p>
            </div>
        </div>
    </div>
    {{/is_owner}}
    
</template>
@endverbatim