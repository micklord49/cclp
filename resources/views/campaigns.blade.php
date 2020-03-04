@extends('layouts.app')

@section('content')
<div class="page-header header-filter" data-parallax="true" style="background-image: url('/images/branch.jpg')">
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <h1 class="title"></h1>
          <h3>Our Campaigns</h3>
          <h4>
          Here is a list of all the campaigns we currently support, 
          either by a councillor, a branch or by the Constituency party as a whole.
          </h4>
          <br>
        </div>
      </div>
    </div>
  </div>



  <div class="main main-raised">
    <div class="container">
      <div class="section text-center">

        <div class="section text-center">
            <div class="team">
            <div class="row">

            @each('layouts.partials.campaigncard',$Data->campaigns,'campaign')

            </div>            
            </div>
        </div>


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



