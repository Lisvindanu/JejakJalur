<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class KoneksiStasiun extends Model
{
    protected $table = 'koneksi_stasiun';

    protected $keyType = 'string';

    public $incrementing = false;

    protected $fillable = [
        'stasiun_dari_id', 'stasiun_ke_id', 'jarak_km', 'tipe',
    ];

    public function stasiunDari(): BelongsTo
    {
        return $this->belongsTo(Stasiun::class, 'stasiun_dari_id');
    }

    public function stasiunKe(): BelongsTo
    {
        return $this->belongsTo(Stasiun::class, 'stasiun_ke_id');
    }
}
