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
                <h3 class="title">{{ $Data->title }}</h3>
                <a href="#pablo" class="btn btn-just-icon btn-link btn-facebook"><i class="fa fa-dribbble"></i></a>
                <a href="#pablo" class="btn btn-just-icon btn-link btn-twitter"><i class="fa fa-twitter"></i></a>
                <a href="#pablo" class="btn btn-just-icon btn-link btn-pinterest"><i class="fa fa-pinterest"></i></a>
              </div>
            </div>
          </div>
        </div>
        <div class="description text-center">
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
              </ul>
            </div>
          </div>
        </div>
        <div class="tab-content tab-space">
          <div class="tab-pane active text-center gallery" id="studio">
            <div class="row">
                {!! $Data->body !!}
            </div>
          </div>
          <div class="tab-pane text-center gallery" id="news">
            <div class="row">
            @include('layouts.partials.news')
            </div>
          </div>
        </div>
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

