<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class WishList extends Model
{
    use HasUuids;

    protected $table = 'wish_list';

    protected $fillable = [
        'user_id', 'destinasi_id', 'tanggal_rencana', 'catatan',
    ];

    protected $casts = [
        'tanggal_rencana' => 'date',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function destinasi(): BelongsTo
    {
        return $this->belongsTo(Destinasi::class);
    }
}
