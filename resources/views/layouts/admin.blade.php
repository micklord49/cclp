<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    
    <!-- Scripts -->
    @yield('component')

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons">
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
    <link rel="stylesheet" href="/css/material-kit.css">
    <link rel="stylesheet" href="/css/appthememod.css">
    <style>
    body {
        backgroundColor: "#ffffff"         
    }
    </style>
</head>
<body>
    <div id="app">

        @include('layouts.partials.menu')


        <main class="py-4">
            @yield('content')
        </main>

    </div>
</body>
<script src="/js/material-kit.min.js?v=2.0.6" type="text/javascript"></script>

</html>
