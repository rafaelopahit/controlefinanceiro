<?php

namespace App\Models;

use Illuminate\Database\Eloquent\SoftDeletes;
use Eloquent;

class DataValues extends Eloquent
{
    use SoftDeletes;

    protected $table = "data_values";
}
