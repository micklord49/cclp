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
                <img src="/images/block-campaigns.png" alt="Circle Image" class="img-raised rounded-circle img-fluid">
              </div>
              <div class="name">
                <h3 class="title">{{ $Data->title }}</h3>
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
          <p>{{ $Data->subtitle }}</p>
        </div>

        @isset($Data->nextevent)
          @isset($Data->nextevent->starttime)
          <div class="section text-center">
            <h2 class="title">Our Next Event</h2>
            <div class="team">
            <div class="row">
              <div class="description text-center">
                <h5>{{ $Data->title }}</h5>
                <p>{{ $Data->subtitle }}</p>
                <p>{{ \Carbon\Carbon::parse($user->from_date)->format('d/m/Y h:M') }}<p>
              </div>
            </div>            
            </div>
         </div>

          @endisset
        @endisset



          <div class="tab-pane active gallery" id="studio">
            <div class="row">
                {!! $Data->body !!}
            </div>
          </div>



        </div>
      </div>


      <div class="row" text-center>
        <div class="col-md-8 ml-auto mr-auto text-center">
          <h2 class="title">Latest news</h2>
          <h5 class="description">Here is the latest news from our campaign.</h5>
        </div>
      </div>
      <div class="row">
        <div class="col-md-8 ml-auto mr-auto">
        @include('layouts.partials.news')
        </div>
      </div>

      <div class="section container">
        <div class="row justify-content-center">
          <h4>This campaign was started by <a href="{{ $Data->by->url }}">{{ $Data->by->description . ' ' . $Data->by->name }}</a>
        </div>
      </div>

      <div class="section container">
      <div class="row justify-content-center">
        @if($Data->useactionlist)
          @include('layouts.partials.list',[
                'list' => $Data->actionlist, 
              ])
        @endif

        @if($Data->usesubscriptionlist)
          @include('layouts.partials.list',[
                  'list' => $Data->subscriptionlist, 
                ])
        @endif
      </div>
    </div>


  @include('layouts.partials.contactform',[
          'owner' => $Data->guid, 
          'title' => 'Have a comment?',
          'subtitle' => 'Would you like to contact us about our campaign? We welcome any contribution.'
        ])



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

