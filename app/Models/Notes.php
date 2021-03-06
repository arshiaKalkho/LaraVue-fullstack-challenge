<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Notes extends Model
{
    use HasFactory;


    protected $fillable = [
        'author',
        'title',
        'content',
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }
}
