@extends('layouts.app')

@section('content')
<div class="page-header header-filter" data-parallax="true" style="background-image: url('/image{{ $Data->imageguid }}/blur')">
  <div class="container">
    <div class="row">
      <div class="col-md-6">
        <h1 class="title">{{ $Data->title }}</h1>
        <h4>{{ $Data->subtitle }}</h4>
        <br>
      </div>
    </div>
  </div>
</div>



<div class="main main-raised">
  <div class="container">
    
    <div class="section text-center">

        <img src="{{ $Data->image }}" class="img-raised rounded img-fluid">



      <div class="row text-left">
        <div class="col-md-12 ml-auto mr-auto">
          <h5 class="description">{!! $Data->body !!}</h5>
        </div>
      </div>

    </div>

    @if($Data->useactionlist)
    <div class="section container">
        <div class="row justify-content-center">
      @include('layouts.partials.list',[
            'list' => $Data->list, 
          ])
        </div>
    </div>
    @endif

    @include('layouts.partials.contactform',[
          'owner' => $Data->guid, 
          'title' => 'Have a question?',
          'subtitle' => 'If you would like to ask a question about this, we wold love to hear from you.'
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



