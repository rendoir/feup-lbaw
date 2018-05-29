window.Pusher = require('pusher-js');
import Echo from "laravel-echo";

let ajax = require('./ajax.js');

window.Pusher.logToConsole = true;

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: '***REMOVED***',
    cluster: 'eu',
    encrypted: false
});

let notifications = [];

const NOTIFICATION_TYPES = {
    newAnswer: 'App\\Notifications\\NewAnswer',
    newComment: 'App\\Notifications\\NewComment',
    newBadgeAttainment: 'App\\Notifications\\NewBadgeAttainment',
};

function routeNotification(notification) {
    // signal notification as read on the next request
    let to = '?read=' + notification.id;
    switch (notification.type) {
        case NOTIFICATION_TYPES.newAnswer:
        case NOTIFICATION_TYPES.newComment:
            const questionId = notification.data.question_id;
            to = 'questions/' + questionId + to;
            break;
    }

    return '/' + to;
}

document.addEventListener('DOMContentLoaded', function() {
    // check if there's a logged in user
    if(Laravel.userId) {
        
        window.Echo.private('App.User.' + window.Laravel.userId)
        .notification((notification) => {
            addNotifications([notification]);
        });

        ajax.sendAjaxRequest('GET', '/api/notifications', null,
                data => addNotifications(JSON.parse(data.target.responseText))
        );

    }
});

function addNotifications(newNotifications) {
    notifications = notifications.concat(newNotifications);
    // show only last 5 notifications
    notifications.slice(0, 5);
    showNotifications(notifications);
}

function showNotifications(notifications) {
    if (notifications.length > 0) {
        let htmlElements = notifications.map(notification => makeNotification(notification));
        document.querySelector('#notificationsMenu').innerHTML = htmlElements.join('');
    }
}

// Make a single notification string
function makeNotification(notification) {
    let to = routeNotification(notification);
    let notificationText = makeNotificationText(notification);
    return '<li><a href="' + to + '">' + notificationText + '</a></li>';
}

function makeNotificationText(notification) {
    let text = '';
    const name = notification.data.following_name;

    if (notification.type === NOTIFICATION_TYPES.newAnswer) {
        text += '<strong>' + name + '</strong> answered ';
        if (notification.data.is_author)
            text += 'your question.';
        else
            text += 'a question you bookmarked.';

    } else if (notification.type === NOTIFICATION_TYPES.newComment) {
        text += '<strong>' + name + '</strong> commented ';
        if (notification.data.is_author)
            text += 'on your message.';
        else
            text += 'on a discussion you\'re participating in.';

    } else if (notification.type === NOTIFICATION_TYPES.newBadgeAttainment) {
        text += 'You got a new <strong>' + notification.badge_type + '</strong> badge!';
    }

    return text;
}
