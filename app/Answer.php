<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Answer extends Model
{
    public function message() {
        return $this->hasOne('App\Message', 'id');
    }
}
