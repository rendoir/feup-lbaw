<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Vote extends Model
{
    public $timestamps = false;

    public function create($message_id, $user_id, $positive) {
        $this->message_id = $message_id;
        $this->user_id = $user_id;
        $this->$positive = $positive;
    }
}
