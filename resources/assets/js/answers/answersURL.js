function getAnswersURL() {
    return window.location.pathname + '/answers';
}

function getAnswerIdURL(id) {
    return getAnswersURL() + '/' + id;
}

module.exports = {
    getAnswersURL,
    getAnswerIdURL
};