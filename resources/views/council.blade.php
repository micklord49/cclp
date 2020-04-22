@extends('layouts.profile')

@section('content')

<div class="page-header header-filter" data-parallax="true" style="background-image: url('/image{{ $Data->imageguid }}/blur');"></div>
  <div class="main main-raised">
    <div class="profile-content">


      <div class="container">
        <div class="row">
          <div class="col-md-6 ml-auto mr-auto">
            <div class="profile">
              <div class="avatar">
                <img src="/images/block-council.png" alt="Circle Image" class="img-raised rounded-circle img-fluid">
              </div>
              <div class="name">
                <h3 class="title">{{ $Data->name }}</h3>
                @if(isset($Data->facebook))
                  <a href="{{ $Data->facebook }}" class="btn btn-just-icon btn-link btn-facebook"><i class="fa fa-facebook"></i></a>
                @endif
                @if(isset($Data->instagram))
                  <a href="{{ $Data->instagram }}" class="btn btn-just-icon btn-link btn-instagram"><i class="fa fa-instagram"></i></a>
                @endif
                @if(isset($Data->twitter))
                  <a href="{{ $Data->twitter }}" class="btn btn-just-icon btn-link btn-twitter"><i class="fa fa-twitter"></i></a>
                @endif
                @if(isset($Data->youtube))
                  <a href="{{ $Data->youtube }}" class="btn btn-just-icon btn-link btn-youtube"><i class="fa fa-youtube"></i></a>
                @endif
              </div>
            </div>
          </div>
        </div>
        <div class="description text-center">
          <img src="{{ $Data->image }}" class="img-raised rounded img-fluid">
          <p>{!! $Data->about !!}</p>
        </div>

        <div class="section text-center container">
            <h2 class="title">Wards</h2>
            @isset($Data->wardlocator)
              <h2 class="title">
                <button class="btn btn-primary btn-round" onclick="document.location='{{ $Data->wardlocator }}';return false;">
                  Find Your Ward <i class="material-icons">search</i>
                </button>
              <h2>
              @endisset
            <div class="row justify-content-center">

                @each('layouts.partials.wardcard',$Data->wards,'ward')

            </div>
        </div>


        <div class="section text-center container">
            <h2 class="title">Your Councillors</h2>
            <div class="row justify-content-center">
              @each('layouts.partials.councillorcard',$Data->councillors,'councillor')
          </div>
        </div>


        <div class="section text-center container">
            <h2 class="title">Latest News</h2>
            <div class="row justify-content-center">
            @include('layouts.partials.news')
          </div>
        </div>

        <div class="section text-center container">
            <h2 class="title">Our Campaigns</h2>
            <div class="row justify-content-center">
            @each('layouts.partials.campaigncard',$Data->campaigns,'campaign')
          </div>
        </div>



      @include('layouts.partials.contactform',[
          'owner' => $Data->guid, 
          'title' => 'Would you like to contact our councillors?',
          'subtitle' => "Would you like to ask a question, or do you need help dealing with '.$Data->name.'? Please send us a message."
        ])


  
      </div>
      </div>
  </div>

  @include('layouts.partials.footer',[])

  @endsection

