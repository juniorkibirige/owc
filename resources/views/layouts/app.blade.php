<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>@yield('title', "OWC")</title>

    <!-- Scripts -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css"
          integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" crossorigin="anonymous">
    <!-- Our Custom CSS -->
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@0.7.4/dist/tailwind.min.css" rel="stylesheet">
{{--    <link rel="stylesheet" href="style.css">--}}

<!-- Font Awesome JS -->
    <script defer src="https://use.fontawesome.com/releases/v5.0.13/js/solid.js"
            integrity="sha384-tzzSw1/Vo+0N5UhStP3bvwWPq+uvzCMfrN1fEFe+xBmv1C/AtVX5K0uZtmcHitFZ"
            crossorigin="anonymous"></script>
    <script defer src="https://use.fontawesome.com/releases/v5.0.13/js/fontawesome.js"
            integrity="sha384-6OIrr52G08NpOFSZdxxz1xdNSndlD4vdcf/q2myIUVO0VsqaGHJsB0RaBE01VTOY"
            crossorigin="anonymous"></script>
    {{--    <script src="{{ asset('js/alpine.js') }}"></script>--}}
    <script src='/js/app.js' defer></script>
    <link rel="stylesheet" href='/css/components-v2.css'>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">

    <!-- Styles -->
    <link href='/css/app.css' rel="stylesheet">
    <style>

        #main {
            display: grid;
            grid-template-columns: 6rem auto;
            /* Or grid-template-columns: config('width.24') auto; */
        }

        @media (min-width: 1200px) {
            /* Or @media (min-width: config('screens.xl')) { */

            #main { grid-template-columns: 12rem auto; }
            /* Or #main { grid-template-columns: config('width.48') auto; } */
        }
        .pt-16 {
            padding-top: 4rem;
        }

        /*
         * Just some customized new utilities needed for the submenus
         * Add this before
         */
        .top-full { top: 100%; }
        .left-full { left: 100%; }

        .fade-enter,
        .fade-leave {
            transition: ease-out;
            transition-duration: 100ms;
        }

        .fade-enter-start,
        .fade-leave-end {
            transform: translateX(-100px) translateY(-100px);
            opacity: 0;
        }
        .group:hover .group-hover\:block {
            display: block;
        }

        .fade-enter-end,
        .fade-leave-start {
            transform: translateX(100px) translateY(100px);
            opacity: 1;
        }
    </style>
    @livewireStyles()
</head>
<body class=" antialiased h-screen">
<div id="app wrapper">
    @if(!Route::is('login'))
        <livewire:navbar/>
    @endif

    <main class="py-4">
{{--        @if(!Route::is('login'))--}}
{{--            <livewire:sidebar/>--}}
{{--        @endif--}}

        @yield('content')
    </main>
</div>

<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
        integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
        crossorigin="anonymous"></script>
<!-- Popper.JS -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.0/umd/popper.min.js"
        integrity="sha384-cs/chFZiN24E4KMATLdqdvsezGxaGsi4hLGOzlXwp5UZB1LY//20VyM2taTB4QvJ"
        crossorigin="anonymous"></script>
<!-- Bootstrap JS -->
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js"
        integrity="sha384-uefMccjFJAIv6A+rW+L4AHf99KvxDjWSu1z9VI8SKNVmz4sk7buKt/6v9KI65qnm"
        crossorigin="anonymous"></script>

@livewireScripts
</body>
</html>
