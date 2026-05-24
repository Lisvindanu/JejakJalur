<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        {{-- Primary SEO --}}
        <meta name="description" content="Direktori destinasi wisata, kuliner, dan UMKM terbaik di jalur kereta Pulau Jawa. Temukan tempat menarik dekat stasiun KRL, KAI, dan Whoosh.">
        <meta name="keywords" content="JejakJalur, wisata kereta, destinasi stasiun, kuliner stasiun, UMKM, KRL Jabodetabek, KAI, Whoosh, rute kereta, Pulau Jawa">
        <meta name="author" content="JejakJalur">
        <meta name="robots" content="index, follow">
        <meta name="theme-color" content="#047857">
        <link rel="canonical" href="{{ url()->current() }}">

        {{-- Open Graph --}}
        <meta property="og:type" content="website">
        <meta property="og:site_name" content="JejakJalur">
        <meta property="og:title" content="JejakJalur — Temukan Permata di Setiap Stasiun">
        <meta property="og:description" content="Direktori destinasi wisata, kuliner, dan UMKM terbaik di jalur kereta Pulau Jawa.">
        <meta property="og:url" content="{{ url()->current() }}">
        <meta property="og:image" content="{{ url('/og-image.png') }}">
        <meta property="og:image:width" content="1200">
        <meta property="og:image:height" content="630">
        <meta property="og:locale" content="id_ID">

        {{-- Twitter --}}
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="JejakJalur — Temukan Permata di Setiap Stasiun">
        <meta name="twitter:description" content="Direktori destinasi wisata, kuliner, dan UMKM di jalur kereta Pulau Jawa.">
        <meta name="twitter:image" content="{{ url('/og-image.png') }}">

        {{-- Icons & PWA --}}
        <link rel="icon" href="/favicon.ico" sizes="any">
        <link rel="icon" href="/favicon.svg" type="image/svg+xml">
        <link rel="apple-touch-icon" href="/apple-touch-icon.png">
        <link rel="manifest" href="/manifest.webmanifest">
        <meta name="mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-status-bar-style" content="default">
        <meta name="apple-mobile-web-app-title" content="JejakJalur">

        {{-- Schema.org --}}
        <script type="application/ld+json">{!! json_encode([
            '@context' => 'https://schema.org',
            '@type' => 'WebSite',
            'name' => 'JejakJalur',
            'url' => config('app.url'),
            'description' => 'Direktori destinasi wisata, kuliner, dan UMKM terbaik di jalur kereta Pulau Jawa.',
            'inLanguage' => 'id-ID',
            'potentialAction' => [
                '@type' => 'SearchAction',
                'target' => config('app.url').'/destinasi?q={search_term_string}',
                'query-input' => 'required name=search_term_string',
            ],
        ], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) !!}</script>

        @fonts

        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
        <x-inertia::head>
            <title>{{ config('app.name', 'JejakJalur') }}</title>
        </x-inertia::head>
    </head>
    <body class="font-sans antialiased">
        <x-inertia::app />
    </body>
</html>
