@extends('layouts.app')

@section('content')
<div class="page-header header-filter" data-parallax="true" style="background-image: url('/images/branch.jpg')">
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <h1 class="title"></h1>
          <h3>Our Branches</h3>
          <h4>We have local branches around your constituency where you can meet with like minded neighbours.
          who are working together to improve the lives of the local residents.
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
            <h2 class="title">What does a branch do?</h2>
            <h5 class="description">Branch members are able to attend branch meetings, which usually take place once a month,
            You can also submit a motion to your Branch, and if it passes it will go to the
            next CLP meeting. If your CLP votes for the motion it will either go to the Local Campaign Forum or to
            Labour’s National Policy Forum. Your Branch is your first port of call for getting involved. Find out
            about your Branch’s next meeting and go along. Branches also get to choose the local council candidates to represent your area.</h5>
          </div>
        </div>

        <div class="section text-center">
            <h2 class="title">Your Branches</h2>
            <div class="team">
            <div class="row">

            @each('layouts.partials.branchcard',$Data->branches,'branch')

            </div>            
            </div>
        </div>

        <div class="section text-center">
            <h2 class="title">The Campaigns our branches support</h2>
            <div class="team">
            <div class="row">

            @each('layouts.partials.campaigncard',$Data->campaigns,'campaign')

            </div>            
            </div>
        </div>

      <div class="row">
            <div class="col-md-8 ml-auto mr-auto">
                <h2 class="title">Latest news</h2>
                <h5 class="description">Here is the latest news from your branches.</h5>
            </div>
        </div>

        <div class="row">
            <div class="col-md-8 ml-auto mr-auto">

            @include('layouts.partials.news')

            </div>
        </div>

      <div class="section section-contacts">
        <div class="row">
          <div class="col-md-8 ml-auto mr-auto">
            <h2 class="text-center title">Get In Touch...</h2>
            <h4 class="text-center description">Do you need help, or want to ask a question but don't know who to contact. Leave a message here and one of our councillors will get back to you.</h4>
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
      <div class="copyright float-right">
        &copy; {{ $Data->name }}
      </div>
    </div>
  </footer>



@endsection



