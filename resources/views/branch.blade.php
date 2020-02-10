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
                <a href="#pablo" class="btn btn-just-icon btn-link btn-facebook"><i class="fa fa-dribbble"></i></a>
                <a href="#pablo" class="btn btn-just-icon btn-link btn-twitter"><i class="fa fa-twitter"></i></a>
                <a href="#pablo" class="btn btn-just-icon btn-link btn-pinterest"><i class="fa fa-pinterest"></i></a>
              </div>
            </div>
          </div>
        </div>
        <div class="description text-center">
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
                Campaigns
            </div>
          </div>
        </div>
      </div>

      <div class="section section-contacts">
        <div class="row">
          <div class="col-md-8 ml-auto mr-auto">
            <h2 class="text-center title">Have a question?</h2>
            <h4 class="text-center description">Ever wanted to ask us a question? Go right ahead.</h4>
            <form class="contact-form">
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label class="bmd-label-floating">Your Name</label>
                    <input type="email" class="form-control">
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label class="bmd-label-floating">Your Email</label>
                    <input type="email" class="form-control">
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label for="exampleMessage" class="bmd-label-floating">Your Message</label>
                <textarea type="email" class="form-control" rows="4" id="exampleMessage"></textarea>
              </div>
              <div class="row">
                <div class="col-md-4 ml-auto mr-auto text-center">
                  <button class="btn btn-primary btn-raised">
                    Send Message
                  </button>
                </div>
              </div>
            </form>
          </div>
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

