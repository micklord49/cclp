@extends('layouts.app')

@section('content')
<div class="page-header header-filter" data-parallax="true" style="background-image: url('/images/514307-PI8QDN-910.jpg')">
  <div class="container">
    <div class="row">
      <div class="col-md-6">
        <h1 class="title">{{ $Data->name }}</h1>
        <h4>Our strength comes from the communities we serve.</h4>
        <h5>We are the local branch of your Labour Party</h5>
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
          <h2 class="title">What we do</h2>
          <h5 class="description">Most people think we are only around during a general election. Learn what we do the rest of the time.</h5>
        </div>
      </div>

      <div class="features">
        <div class="row">
          <div class="col-md-4">
            <div class="info">
              <div class="icon icon-info">
                <i class="material-icons">chat</i>
              </div>
              <h4 class="info-title">Get in touch.</h4>
              <p>We would love to hear from you if you have a question or a suggestion.</p>
            </div>
          </div>
          <div class="col-md-4">
            <div class="info">
              <div class="icon icon-success">
                <i class="material-icons">emoji_people</i>
              </div>
              <h4 class="info-title">Get Involved</h4>
              <p>You don't have to be a member to support our work helping out the local community.</p>
            </div>
          </div>
          <div class="col-md-4">
            <div class="info">
              <div class="icon icon-danger">
                <i class="material-icons">card_membership</i>
              </div>
              <h4 class="info-title">Join Us</h4>
              <p>Do you want to have more of a say? Join up and join the conversations.</p>
            </div>
          </div>
        </div>
      </div>

    </div>

    <div class="section text-center">
      <h2 class="title">Discover the neighbourhoods we cover</h2>
      <div class="team">
        <div class="row">
          <div class="col-md-6">
            <div class="team-player">
              <div class="card card-plain" style="cursor:pointer" onclick="document.location='/ward';return false;">
                <div class="col-md-6 ml-auto mr-auto">
                  <img src="/images/block-ward.png" alt="Thumbnail Image" class="img-raised rounded-circle img-fluid">
                </div>
                <h4 class="card-title">Wards
                  <br>
                  <small class="card-description text-muted">Discover our wards</small>
                </h4>
                <div class="card-body">
                  <p class="card-description">A ward is the primary unit of English electoral geography for civil parishes and borough and district councils</p>
                </div>
                <div class="card-footer justify-content-center">
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="team-player">
              <div class="card card-plain" style="cursor:pointer" onclick="document.location='/branch';return false;">
                <div class="col-md-6 ml-auto mr-auto">
                  <img src="/images/block-branch.png" alt="Thumbnail Image" class="img-raised rounded-circle img-fluid">
                </div>
                <h4 class="card-title">Branches
                  <br>
                  <small class="card-description text-muted">Discover our branches</small>
                </h4>
                <div class="card-body">
                  <p class="card-description">Branches are how we organise our activities across the consituency.</p>
                </div>
                <div class="card-footer justify-content-center">
                  <a href="#pablo" class="btn btn-link btn-just-icon"><i class="fa fa-twitter"></i></a>
                  <a href="#pablo" class="btn btn-link btn-just-icon"><i class="fa fa-instagram"></i></a>
                  <a href="#pablo" class="btn btn-link btn-just-icon"><i class="fa fa-facebook-square"></i></a>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>






    <div class="section text-center">
      <h2 class="title">Meet the people of the CLP</h2>
      <div class="team">
        <div class="row">
          <div class="col-md-4">
            <div class="team-player">
              <div class="card card-plain" style="cursor:pointer" onclick="document.location='/councillors';return false;">
                <div class="col-md-6 ml-auto mr-auto">
                  <img src="/images/block-people.png" alt="Thumbnail Image" class="img-raised rounded-circle img-fluid">
                </div>
                <h4 class="card-title">Councillors
                  <br>
                  <small class="card-description text-muted">8</small>
                </h4>
                <div class="card-body">
                  <p class="card-description">These are your representatives on the local council. They can help you with a wide range of issues from 
                    housing to schools.</p>
                </div>
                <div class="card-footer justify-content-center">
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="team-player">
              <div class="card card-plain">
                <div class="col-md-6 ml-auto mr-auto">
                  <img src="/images/block-candidate.png" alt="Thumbnail Image" class="img-raised rounded-circle img-fluid">
                </div>
                <h4 class="card-title">Parliamentary Candidate
                  <br>
                  <small class="card-description text-muted">(Prospective)</small>
                </h4>
                <div class="card-body">
                  <p class="card-description">Meet John, our local candidate for Parliament.</p>
                </div>
                <div class="card-footer justify-content-center">
                  <a href="#pablo" class="btn btn-link btn-just-icon"><i class="fa fa-twitter"></i></a>
                  <a href="#pablo" class="btn btn-link btn-just-icon"><i class="fa fa-instagram"></i></a>
                  <a href="#pablo" class="btn btn-link btn-just-icon"><i class="fa fa-facebook-square"></i></a>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="team-player">
              <div class="card card-plain" style="cursor:pointer" onclick="document.location='/committee';return false;">
                <div class="col-md-6 ml-auto mr-auto">
                  <img src="/images/block-council.png" alt="Thumbnail Image" class="img-raised rounded-circle img-fluid">
                </div>
                <h4 class="card-title">The EC
                  <br>
                  <small class="card-description text-muted">(Executive Committee)</small>
                </h4>
                <div class="card-body">
                  <p class="card-description">It sounds fancy, but they are the people that do the boring work of the CLP leaving the members
                    free to work on our local campaigns and formulate policies that can make everyone's life better.</p>
                </div>
                <div class="card-footer justify-content-center">
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>

    <div class="row" text-center>
        <div class="col-md-8 ml-auto mr-auto text-center">
            <h2 class="title">Latest news</h2>
            <h5 class="description">Here is the latest news from our CLP.</h5>
        </div>
    </div>

    <div class="row">
        <div class="col-md-8 ml-auto mr-auto">

        @include('layouts.partials.news')

        </div>
    </div>


<form method="POST" action="/message/new/{{ $Data->guid }}">
@csrf
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
                  <input name="msgname" id="msgname" type="text" class="form-control">
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label class="bmd-label-floating">Your Email</label>
                  <input name="msgemail" id="msgemail" type="email" class="form-control">
                </div>
              </div>
            </div>
            <div class="form-group">
              <label for="exampleMessage" class="bmd-label-floating">Your Message</label>
              <textarea type="text" class="form-control" rows="4" name="msgmessage" id="msgmessage"></textarea>
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
</Form>

    
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



