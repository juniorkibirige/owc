<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="perfect-scrollbar-off nav-open">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">

        <meta name="csrf-token" content="{{ csrf_token() }}">
        <link rel="canonical" href="http://127.0.0.1"></link:c>

        <title>{{ config('app.name', 'Police Form') }}</title>
        <!-- Favicon -->
        <link href="{{ asset('argon') }}/img/brand/favicon.png" rel="icon" type="image/png">
        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700" rel="stylesheet">
        <!-- Icons -->
        <link href="{{ asset('argon') }}/vendor/nucleo/css/nucleo.css" rel="stylesheet">
        <link href="{{ asset('argon') }}/vendor/@fortawesome/fontawesome-free/css/fontawesome.min.css" rel="stylesheet">
        <link href="{{ asset('argon') }}/css/bootstrap.min.css" rel="stylesheet">
        <link href="{{ asset('argon') }}/css/util.css" rel="stylesheet">
        <link href="{{ asset('argon') }}/css/main.css" rel="stylesheet">
        <!-- Argon CSS -->
        <link type="text/css" href="{{ asset('argon') }}/css/argon.css?v=1.0.0" rel="stylesheet">
    </head>
    <body class="g-sidenav-pinned" style="background-image: url(/argon/img/brand/bg-01.jpg)">
    <!-- <body class=""> -->
        
        <div id="root"></div>
        <script src="{{ asset('js/app.js') }}"></script>

        <script src="{{ asset('argon') }}/vendor/jquery/dist/jquery.min.js"></script>
        <!-- <script src="{{ asset('argon') }}/vendor/@fortawesome/fontawesome-free/js/all.min.js"></script> -->
        <script src="//kit.fontawesome.com/0be66f9bc5.js" crossorigin="anonymous"></script>
        <script src="{{ asset('argon') }}/vendor/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
        
        @stack('js')
        
        <!-- Argon JS -->
        <script src="{{ asset('argon') }}/vendor/bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js"></script>
        <script src="{{ asset('argon') }}/js/argon.js?v=1.0.0"></script>

    </body>
</html>