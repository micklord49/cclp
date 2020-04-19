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
                <img src="/images/block-ward.png" alt="Circle Image" class="img-raised rounded-circle img-fluid">
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
            <h2 class="title">Your Councillors</h2>
            <div class="row justify-content-center">
              @each('layouts.partials.councillorcard',$Data->councillors,'councillor')
          </div>
        </div>



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

