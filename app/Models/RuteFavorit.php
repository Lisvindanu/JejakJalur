<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RuteFavorit extends Model
{
    protected $table = 'rute_favorit';

    protected $fillable = [
        'user_id', 'nama', 'dari_kode', 'ke_kode', 'dari_nama', 'ke_nama', 'mode',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
