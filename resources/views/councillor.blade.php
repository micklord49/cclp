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
                <img src="/images/block-councillor.png" alt="Circle Image" class="img-raised rounded-circle img-fluid">
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


          <p>{{ $Data->intro }}</p>
        </div>
        <div class="row">
          <div class="col-md-6 ml-auto mr-auto">
            <div class="profile-tabs">
              <ul class="nav nav-pills nav-pills-icons justify-content-center" role="tablist">
                <li class="nav-item">
                  <a class="nav-link active" href="#studio" role="tab" data-toggle="tab">
                    <i class="material-icons">info</i> About
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#news" role="tab" data-toggle="tab">
                    <i class="material-icons">local_library</i> News
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#favorite" role="tab" data-toggle="tab">
                    <i class="material-icons">flag</i> Campaigns
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>


        <div class="tab-content tab-space">
          <div class="tab-pane active text-center gallery" id="studio">
            <div class="row">
                {!! $Data->about !!}
            </div>
          </div>
          <div class="tab-pane text-center gallery" id="news">
            <div class="row">
            @include('layouts.partials.news')
            </div>
          </div>
          <div class="tab-pane text-center gallery" id="favorite">
            <div class="row">
            @each('layouts.partials.campaigncard',$Data->campaigns,'campaign')
            </div>
          </div>
        </div>
      </div>


      <div class="section text-center container">
        <div class="row justify-content-center">
          @if(isset($Data->ward))
              @include('layouts.partials.wardcard',['ward'=> $Data->ward])
          @endif
          @if(isset($Data->branch))
              @include('layouts.partials.branchcard',['branch'=> $Data->branch])
          @endif
        </div>
      </div>

      @include('layouts.partials.socialfeed',['intro' => 'My',]);

      @include('layouts.partials.contactform',[
          'owner' => $Data->guid, 
          'title' => 'Have a question or need help?',
          'subtitle' => 'Would you like to ask me a question, or do you need help dealing with Westminster Council? Please send me a message.'
        ])


      </div>
  </div>


  @include('layouts.partials.footer',[])


  @endsection

