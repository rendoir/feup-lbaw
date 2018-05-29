<?php

namespace App\Observers;

use App\BadgeAttainment;
use App\Notifications\NewBadgeAttainment;
use App\Badge;
use App\User;

class BadgeAttainmentObserver
{
    public function created(BadgeAttainment $badge_attainment)
    {
        $badge = $badge_attainment->get_badge();
        $user = $badge_attainment->get_user();

        info("new badge for user " . $user->username);

        $user->notify(new NewBadgeAttainment($user, $badge));
    }
}
