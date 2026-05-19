<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Stasiun extends Model
{
    protected $table = 'stasiun';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = ['kota_id', 'nama', 'kode_stasiun'];

    public function kota(): BelongsTo
    {
        return $this->belongsTo(Kota::class);
    }

    public function destinasi(): HasMany
    {
        return $this->hasMany(Destinasi::class);
    }
}
