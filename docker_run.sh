#!/bin/bash
set -e

env >> /var/www/.env
php-fpm7.1 -D
cd /var/www/
php artisan migrate:fresh --seed --force
nginx -g "daemon off;"