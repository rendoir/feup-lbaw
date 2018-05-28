window._ = require('lodash');
window.$ = window.jQuery = require('jquery');
require('bootstrap-sass');

window.Pusher = require('pusher-js');
import Echo from "laravel-echo";

window.Pusher.logToConsole = true;

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: '***REMOVED***',
    cluster: 'eu',
    encrypted: false
});

var notifications = [];

const NOTIFICATION_TYPES = {
    newAnswer: 'App\\Notifications\\NewAnswer'
};

function routeNotification(notification) {
    var to = '?read=' + notification.id;
    if(notification.type === NOTIFICATION_TYPES.newAnswer) {
        const answerId = notification.data.answer_id;
        to = 'answers/' + answerId + to; //TODO: Correct links
    }
    return '/' + to;
}

function makeNotificationText(notification) {
    var text = '';
    if(notification.type === NOTIFICATION_TYPES.newAnswer) {
        const name = notification.data.following_name;
        text += '<strong>' + name + '</strong> answered your question';
    }
    return text;
}

$(document).ready(function() {
    // check if there's a logged in user
    if(Laravel.userId) {
        
        window.Echo.private('App.User.' + window.Laravel.userId)
        .notification((notification) => {
            console.log("eu");
            addNotifications([notification], '#notifications');
        });

        $.get('/notifications', function (data) {
            addNotifications(data, "#notifications");
        });

    }
});

function addNotifications(newNotifications, target) {
    notifications = _.concat(notifications, newNotifications);
    // show only last 5 notifications
    notifications.slice(0, 5);
    showNotifications(notifications, target);
}

function showNotifications(notifications, target) {
    if (notifications.length > 0) {
        var htmlElements = notifications.map(function (notification) {
            return makeNotification(notification);
        });
        $('#notificationsMenu').html(htmlElements.join(''));
    } else {
        $('#notificationsMenu').html('<div class="dropdown-divider"></div><button type="button class="dropdown-item" href="#">No Unread Notifications</button>');
    }
}

// Make a single notification string
function makeNotification(notification) {
    var to = routeNotification(notification);
    var notificationText = makeNotificationText(notification);
    return '<li><a href="' + to + '">' + notificationText + '</a></li>';
}