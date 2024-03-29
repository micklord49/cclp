<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', '{$Data->name}') }}</title>
    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}" ></script>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700,200" rel="stylesheet" />
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css" rel="stylesheet">

    <link rel="stylesheet" href="https://unpkg.com/bootstrap-material-design@4.1.1/dist/css/bootstrap-material-design.min.css" integrity="sha384-wXznGJNEXNG1NFsbm0ugrLFMQPWswR3lds2VeinahP8N0zJw9VWSopbjv2x7WCvX" crossorigin="anonymous">
    <script src="https://unpkg.com/bootstrap-material-design@4.1.1/dist/js/bootstrap-material-design.js" integrity="sha384-CauSuKpEqAFajSpkdjv3z9t8E7RlpJ1UP0lKM/+NdtSarroVKu069AlsRPKkFBz9" crossorigin="anonymous"></script>

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons">
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
    <link href="https://fonts.googleapis.com/css?family=Roboto+Slab&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/css/material-kit.css">
    <link rel="stylesheet" href="/css/appthememod.css">

    <style>
    
    .material-icons.md-18 { font-size: 18px; vertical-align: middle;}
    .material-icons.md-24 { font-size: 24px; vertical-align: middle;}
    .material-icons.md-36 { font-size: 36px; vertical-align: middle;}
    .material-icons.md-48 { font-size: 48px; vertical-align: middle;}

    .material-icons.md-yellow { color: rgba(240, 192, 128, 1); }

    </style>

<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
<script type="text/javascript">
      google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);


      function drawChart() {
        @yield('chartsjs')

        @section('chartsjs')

@foreach($Data->boards as $board)

var data = google.visualization.arrayToDataTable(  
    [
          ['Day', 'Visits'],
@foreach ($board->visits->last7 as $i)
    [ '{{ $i->day }}', {{ $i->visits }} ],
@endforeach
    ])

        var options = {
          title: 'Web Visitors',
          curveType: 'function',
          legend: { position: 'bottom' },
          vAxis: { 
              minValue: 0,
              viewWindow: { min: 0 }
            }
        };
        var chart = new google.visualization.AreaChart(document.getElementById('chart_{{ $board->guid }}'));
        chart.draw(data, options);
@endforeach


      }

</script>
</head>
<body class="landing-page">
<div id="app">
@include('layouts.partials.menu')
<main class="py-4">
    @yield('content')
</main>
</div>
</body>
<script src="/js/material-kit.min.js?v=2.0.6" type="text/javascript"></script>

</html>
