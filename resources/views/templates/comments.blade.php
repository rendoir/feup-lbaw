@verbatim
<template class="comments">
    <div class="card-footer comments-card">
        <div class="d-flex list-group list-group-flush">
            {{#comments}}

            @endverbatim
            @include('templates.abstractComment')
            @verbatim

            {{/comments}}
        </div>
    </div>
</template>
@endverbatim

@verbatim
<template class="comment">
    {{#comment}}

    @endverbatim
    @include('templates.abstractComment')
    @verbatim

    {{/comment}}
</template>
@endverbatim