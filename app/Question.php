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

    public function answers() {
        return $this->hasMany('App\Answer');
    }

    public function get_num_answers() {
        return $this->answers()->count();
    }

}
