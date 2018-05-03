<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    protected $fillable = ['id', 'title'];

    public $timestamps = false;

    public function message()
    {
        return $this->hasOne('App\Message', 'id');
    }

    public function answers()
    {
        return $this->hasMany('App\Answer')->get();
    }

    public function commentable()
    {
        return $this->hasOne('App\Commentable');
    }

    public function correct_answer()
    {
        return $this->belongsTo('App\Answer', 'correct_answer');
    }

    public function get_num_answers()
    {
        return $this->answers()->count();
    }

    public function scopeHighlyVoted($query)
    {
        return $query->join('messages', "messages.id", "questions.id")
            ->orderBy('messages.score', 'DESC');
    }

    public function scopeSearch($query, $search, $categories = null)
    {
        if (!$search && !$categories) {
            return $query;
        }

        return $query
            ->whereRaw('search @@ to_tsquery(\'english\', replace(plainto_tsquery(\'english\', ?)::text, \'&\', \'|\'))', [$search])
            ->orderByRaw('ts_rank(search, to_tsquery(\'english\', replace(plainto_tsquery(\'english\', ?)::text, \'&\', \'|\'))) DESC', [$search]);
    }

    public function categories()
    {
        return $this->belongsToMany(
            'App\Category',
            'questions_categories',
            'question_id',
            'category_id'
        );
    }

}