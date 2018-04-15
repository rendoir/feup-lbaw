<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

use App;

class Question extends Model
{
    public $timestamps = false;

    public function message() {
        return $this->hasOne('App\Message', 'id');
    }

}
