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
          <div class="col-md-4" style="cursor:pointer" onclick="document.location='#contactform';return false;">
            <div class="info">
              <div class="icon icon-info">
                <i class="material-icons">chat</i>
              </div>
              <h4 class="info-title">Get in touch.</h4>
              <p>We would love to hear from you if you have a question or a suggestion.</p>
            </div>
          </div>
          <div class="col-md-4" style="cursor:pointer" onclick="document.location='/campaigns';return false;">
            <div class="info">
              <div class="icon icon-success">
                <i class="material-icons">emoji_people</i>
              </div>
              <h4 class="info-title">Get Involved</h4>
              <p>You don't have to be a member to support our work helping out the local community.</p>
            </div>
          </div>
          <div class="col-md-4" style="cursor:pointer" onclick="document.location='https://join.labour.org.uk/?utm_source=website&utm_medium=actionmenu';return false;">
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

        <div class="col-md-4">
            <div class="team-player">
              <div class="card card-plain" style="cursor:pointer" onclick="document.location='/wards';return false;">
                <div class="col-md-6 ml-auto mr-auto">
                  <img src="/images/block-wards.png" alt="Thumbnail Image" class="img-raised rounded-circle img-fluid">
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


        @if($Data->councilsingle)
          <div class="col-md-4">
            <div class="team-player">
              <div class="card card-plain" style="cursor:pointer" onclick="document.location='/wards';return false;">
                <div class="col-md-6 ml-auto mr-auto">
                  <img src="/images/block-wards.png" alt="Thumbnail Image" class="img-raised rounded-circle img-fluid">
                </div>
                <h4 class="card-title">{{ $Data->councilcardtitle }}</h4>
                <div class="card-body">
                  <p class="card-description">A ward is the primary unit of English electoral geography for civil parishes and borough and district councils</p>
                </div>
                <div class="card-footer justify-content-center">
                </div>
              </div>
            </div>
          </div>

          @else

          <div class="col-md-4">
            <div class="team-player">
              <div class="card card-plain">
                <div class="col-md-6 ml-auto mr-auto">
                  <img src="/images/block-council.png" alt="Thumbnail Image" class="img-raised rounded-circle img-fluid">
                </div>
                <h4 class="card-title">{{ $Data->councilcardtitle }}</h4>
                <div class="card-body">
                  <p class="card-description">
                  @foreach ($Data->councils as $council)
                  <button class="btn btn-primary btn-round" onclick="document.location='/council/{{ $council->guid }}';return false;">
                    {{ $council->name }}
                  </button>
                  @endforeach
                  </p>
                </div>
                <div class="card-footer justify-content-center">
                </div>
              </div>
            </div>
          </div>


          @endif


          <div class="col-md-4">
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
              <div class="card card-plain" style="cursor:pointer" onclick="document.location='/ourcandidate';return false;">
                <div class="col-md-6 ml-auto mr-auto">
                  <img src="/images/block-candidate.png" alt="Thumbnail Image" class="img-raised rounded-circle img-fluid">
                </div>
                <h4 class="card-title">{{ $Data->candidate->name }}
                  <br>
                  <small class="card-description text-muted">{{ $Data->candidate->title }}</small>
                </h4>
                <div class="card-body">
                  <p class="card-description">{{ $Data->candidate->intro }}</p>
                </div>
                <div class="card-footer justify-content-center">
                    @if(isset($branch->facebook))
                        <a href="{{ $branch->facebook }}" class="btn btn-just-icon btn-link btn-facebook"><i class="fa fa-facebook"></i></a>
                    @endif
                    @if(isset($branch->instagram))
                        <a href="{{ $branch->instagram }}" class="btn btn-just-icon btn-link btn-instagram"><i class="fa fa-instagram"></i></a>
                    @endif
                    @if(isset($branch->twitter))
                        <a href="{{ $branch->twitter }}" class="btn btn-just-icon btn-link btn-twitter"><i class="fa fa-twitter"></i></a>
                    @endif
                    @if(isset($branch->youtube))
                        <a href="{{ $branch->youtube }}" class="btn btn-just-icon btn-link btn-youtube"><i class="fa fa-youtube"></i></a>
                    @endif
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="team-player">
              <div class="card card-plain" style="cursor:pointer" onclick="document.location='/committee';return false;">
                <div class="col-md-6 ml-auto mr-auto">
                  <img src="/images/block-ec.png" alt="Thumbnail Image" class="img-raised rounded-circle img-fluid">
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
    <div class="copyright float-right">
      &copy; {{ $Data->name }}
    </div>
  </div>
</footer>



@endsection



