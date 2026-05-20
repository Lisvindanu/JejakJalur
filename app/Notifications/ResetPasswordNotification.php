<?php

namespace App\Notifications;

use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ResetPasswordNotification extends Notification
{
    public function __construct(public string $token) {}

    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        $url = url(route('password.reset', [
            'token' => $this->token,
            'email' => $notifiable->getEmailForPasswordReset(),
        ], false));

        $nama = $notifiable->nama ?? $notifiable->name ?? 'Pengguna';

        return (new MailMessage)
            ->subject('Reset Password — JejakJalur')
            ->greeting('Halo, '.$nama.'!')
            ->line('Kami menerima permintaan reset password untuk akun JejakJalur kamu.')
            ->action('Reset Password Sekarang', $url)
            ->line('Tautan ini akan kedaluwarsa dalam **60 menit**.')
            ->line('Jika kamu tidak merasa meminta reset password, abaikan email ini — akunmu tetap aman.')
            ->salutation('Salam, Tim JejakJalur');
    }
}
