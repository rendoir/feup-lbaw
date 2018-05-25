@verbatim
<template id="alert-template">
    {{#isSucess}}
    <div class="alert alert-success alert-dismissible m-0" style="width: 100%" role="alert">
    {{/isSucess}}
    {{^isSucess}}
    <div class="alert alert-danger alert-dismissible m-0" style="width: 100%" role="alert">
    {{/isSucess}}
        <div class="container">
            <div class="d-flex justify-content-between">
            <div>{{message}}</div>
            <button type="button" class="close" style="position: inherit; padding: inherit" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            </div>
        </div>
    </div>
</template>
@endverbatim
