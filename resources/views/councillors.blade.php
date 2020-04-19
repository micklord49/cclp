@extends('layouts.app')

@section('content')
<div class="page-header header-filter" data-parallax="true" style="background-image: url('/images/councillors.jpg')">
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <h1 class="title">{{ $Data->name }}</h1>
          <h3>Your Councillors</h3>
          <h4>We are the people who are there to give you a voice in local government.</h4>
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
            <h5 class="description">If you are having a problem with the burocracy of your local council. We can help. 
            We can give you a voice in the decissions that affect our community.</h5>
          </div>
        </div>
      </div>


        <div class="section text-center">
            <h2 class="title">Your Councillors</h2>
            <div class="team">
          </div>
        </div>
        <div class="row justify-content-center">
              @each('layouts.partials.councillorcard',$Data->councillors,'councillor')
        </div>


        <div class="row">
            <div class="col-md-8 ml-auto mr-auto  text-center">
                <h2 class="title">Latest news</h2>
                <h5 class="description">Here is the latest news from our councillors.</h5>
            </div>
        </div>

        <div class="row">
            <div class="col-md-8 ml-auto mr-auto">

            @include('layouts.partials.news')

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



