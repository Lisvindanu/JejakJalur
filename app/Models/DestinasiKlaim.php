<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DestinasiKlaim extends Model
{
    use HasUuids;

    protected $table = 'destinasi_klaim';

    protected $fillable = ['destinasi_id', 'user_id', 'keterangan', 'status', 'catatan_admin'];

    public function destinasi(): BelongsTo
    {
        return $this->belongsTo(Destinasi::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
