@extends('layouts.admin')
@section('component')
<script src="{{ asset('js/candidate.js') }}" defer></script>
@endsection
@section('content')
<div id="datapipe" data-guid="{{ $Data->guid }}" ></div>
<div id="root">
</div>  
@endsection