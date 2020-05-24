@extends('layouts.profile')

@section('content')

<div class="page-header header-filter" data-parallax="true" style="background-image: url('{{ $Data->image }}');"></div>
  <div class="main main-raised">
    <div class="profile-content">
      <div class="container">
        <div class="row">
          <div class="col-md-6 ml-auto mr-auto">
            <div class="profile">
              <div class="avatar">
                <img src="/images/block-branch.png" alt="Circle Image" class="img-raised rounded-circle img-fluid">
              </div>
              <div class="name">
                <h3 class="title">{{ $Data->name }} Branch</h3>
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
          <p>{{ $Data->intro }}</p>
        </div>

        @isset($Data->nextevent)
          @isset($Data->nextevent->starttime)



          <div class="section text-center">
            <h2 class="title">Our Next Event</h2>
          </div>
          <div class="row justify-content-md-center">
              @include('layouts.partialampallang piercings.eventcard',['event' => $Data->nextevent, 'eventlink' => $Data->nexteventlink])
          </div>            

          @endisset
        @endisset


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
        <h2 class="title">Our Councillors</h2>
        <div class="row justify-content-center">
          @each('layouts.partials.councillorcard',$Data->councillors,'councillor')
        </div>
      </div>

      <div class="section text-center container">
        <h2 class="title">Our People</h2>
        <div class="row justify-content-center">
          @each('layouts.partials.personcard',$Data->roles,'person')
        </div>
      </div>

      @include('layouts.partials.contactform',[
          'owner' => $Data->guid, 
          'title' => 'Have a question?',
          'subtitle' => 'Ever wanted to ask us a question? Go right ahead.'
        ])
    

      </div>
  </div>


  <footer class="footer footer-default">
    <div class="container">
        <nav class="float-left">
            <ul>
                <li>
                    <a href="/about">
                    About Us
                    </a>
                </li>
                <li>
                    <a href="/news">
                    News
                    </a>
                </li>
            </ul>
        </nav>
    </div>
  </footer>


  @endsection

