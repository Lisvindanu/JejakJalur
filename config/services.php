<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Mailgun, Postmark, AWS and more. This file provides the de facto
    | location for this type of information, allowing packages to have
    | a conventional file to locate the various service credentials.
    |
    */

    'postmark' => [
        'key' => env('POSTMARK_API_KEY'),
    ],

    'resend' => [
        'key' => env('RESEND_API_KEY'),
    ],

    'ses' => [
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],

    'slack' => [
        'notifications' => [
            'bot_user_oauth_token' => env('SLACK_BOT_USER_OAUTH_TOKEN'),
            'channel' => env('SLACK_BOT_USER_DEFAULT_CHANNEL'),
        ],
    ],

    'google' => [
        'client_id' => env('GOOGLE_CLIENT_ID'),
        'client_secret' => env('GOOGLE_CLIENT_SECRET'),
        'redirect' => env('GOOGLE_REDIRECT_URI'),
    ],

    'tavily' => [
        'key' => env('TAVILY_API_KEY'),
        'key_2' => env('TAVILY_API_KEY_2'),
        'key_3' => env('TAVILY_API_KEY_3'),
    ],

    'ollama' => [
        'key_1' => env('OLLAMA_API_KEY_1'),
        'key_2' => env('OLLAMA_API_KEY_2'),
        'key_3' => env('OLLAMA_API_KEY_3'),
        'key_4' => env('OLLAMA_API_KEY_4'),
        'key_5' => env('OLLAMA_API_KEY_5'),
        'model' => env('OLLAMA_MODEL', 'gemma3:4b'),
        'endpoint' => env('OLLAMA_ENDPOINT', 'https://ollama.com/api/chat'),
        'embed_endpoint' => env('OLLAMA_EMBED_ENDPOINT', 'http://localhost:11434/api/embed'),
        'embed_model' => env('OLLAMA_EMBED_MODEL', 'nomic-embed-text'),
    ],

];
