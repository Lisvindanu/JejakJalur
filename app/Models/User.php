<?php

namespace App\Models;

use App\Notifications\ResetPasswordNotification;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use Notifiable, SoftDeletes;

    protected $keyType = 'string';

    public $incrementing = false;

    protected $fillable = [
        'nama', 'name', 'email', 'password',
        'google_id', 'github_id', 'is_admin', 'consent_given',
    ];

    protected $hidden = ['password', 'remember_token'];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'is_admin' => 'boolean',
        'consent_given' => 'boolean',
        'password' => 'hashed',
    ];

    public function sendPasswordResetNotification(string $token): void
    {
        $this->notify(new ResetPasswordNotification($token));
    }

    public function ulasan(): HasMany
    {
        return $this->hasMany(Ulasan::class);
    }
}
