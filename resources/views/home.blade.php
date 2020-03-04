@extends('layouts.dashboard')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">Dashboard</div>
                <div class="card-body">
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                        </div>
                    @endif
                    <h2><i class="material-icons md-48">insert_chart</i>Your Dashboard</h2>
                </div>
            </div>
        </div>

        @each('layouts.partials.board',$Data->boards,'board')


    </div>
</div>
@endsection
