@extends('layouts.app')

@section('content')
<div class="page-header header-filter" data-parallax="true" style="background-image: url('/images/wards.png')">
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <h1 class="title"></h1>
          <h3>Our Wards</h3>
          <h4>Explore the local areas we cover.
          </h4>
          <br>
        </div>
      </div>
    </div>
  </div>



  <div class="main main-raised">
    <div class="container">
      <div class="section text-center">
        <div class="row">
          <div class="col-md-8 ml-auto mr-auto">
            <h2 class="title">What is a ward?</h2>
            <h5 class="description"></h5>
          </div>
        </div>

        @foreach($Data->councils as $council)

            <div class="section text-center">
                <h2 class="title">{{ $council->name }}</h2>
                @isset($council->wardlocator)
                <h2 class="title">
                  <button class="btn btn-primary btn-round" onclick="document.location='{{ $council->wardlocator }}';return false;">
                    Find Your Ward <i class="material-icons">search</i>
                  </button>
                <h2>
                @endisset
                <div class="team">
                <div class="row">

                @each('layouts.partials.wardcard',$council->wards,'ward')

                </div>            
                </div>
            </div>

        @endforeach

      </div>
    </div>
  </div>


  @include('layouts.partials.footer',[])



@endsection



