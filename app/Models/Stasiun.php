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

    protected $fillable = ['kota_id', 'nama', 'kode_stasiun', 'lat', 'lng'];

    public function kota(): BelongsTo
    {
        return $this->belongsTo(Kota::class);
    }

    public function destinasi(): HasMany
    {
        return $this->hasMany(Destinasi::class);
    }

    public function koneksiDari(): HasMany
    {
        return $this->hasMany(KoneksiStasiun::class, 'stasiun_dari_id');
    }

    public function koneksiKe(): HasMany
    {
        return $this->hasMany(KoneksiStasiun::class, 'stasiun_ke_id');
    }
}
