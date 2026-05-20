<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

class Kota extends Model
{
    protected $table = 'kota';

    protected $keyType = 'string';

    public $incrementing = false;

    protected $fillable = ['nama', 'kode_ibukota', 'foto'];

    public function stasiun(): HasMany
    {
        return $this->hasMany(Stasiun::class);
    }

    public function destinasi(): HasManyThrough
    {
        return $this->hasManyThrough(Destinasi::class, Stasiun::class);
    }
}
