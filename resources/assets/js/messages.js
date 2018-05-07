function genericClickListener(selector, method) {

    let messages = document.querySelectorAll(selector);
    if (messages == null)
        return;

    for (let message of messages) {

        let ref_message_id = message.getAttribute('data-message-id');
        if (ref_message_id == null)
            return;

        message.addEventListener('click', function () {
            method(ref_message_id);
        });
    }
}

function genericSingleClickListener(selector, method, message_id) {

    let message = document.querySelector(selector + "[data-message-id='" + message_id + "']");
    if (message == null)
        return;

    message.addEventListener('click', function () {
        method(message_id);
    });
}

function genericEnterListener(selector, method) {

    let messages = document.querySelectorAll(selector);
    if (messages == null)
        return;

    for (let message of messages) {

        let ref_message_id = message.getAttribute('data-message-id');
        if (ref_message_id == null)
            return;

        message.addEventListener('keyup', function (event) {
            if (event.keyCode == 13) {
                method(ref_message_id);
            }
        });
    }
}

function genericSingleEnterListener(selector, method, message_id) {

    let message = document.querySelector(selector + "[data-message-id='" + message_id + "']");
    if (message == null)
        return;

    message.addEventListener('keyup', function (event) {
        if (event.keyCode == 13) {
            method(message_id);
        }
    });
}

module.exports = {
    genericClickListener,
    genericEnterListener,
    genericSingleClickListener,
    genericSingleEnterListener
};