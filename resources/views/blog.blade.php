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
        <div>
          <span style="font-style: italic;font-size: small;color: rgb(180,96,180);margin-top:10px;">Published On {{ Carbon\Carbon::parse($Data->publishedon)->format('l jS F Y g:ia') }}</span>
          <span style="font-style: italic;font-size: small;color: rgb(180,96,180);margin-top:10px;"> By <a href="{{ $Data->publishedby->url }}">{{ $Data->publishedby->name }}</a></span>
        </div>
        <div class="col-md-12 ml-auto mr-auto">
          <h5 class="description">{!! $Data->body !!}</h5>
        </div>
      </div>

    </div>

    <div class="section container">
      <div class="row justify-content-center">
        @if($Data->useactionlist)
          @include('layouts.partials.list',[
                'list' => $Data->list, 
              ])
        @endif

        @if($Data->showcampaign)
          @include('layouts.partials.campaigncard',[
                  'campaign' => $Data->campaign, 
                ])
        @endif
      </div>
    </div>

    <div class="section container">
      <div class="row justify-content-center">
        <div id="survey"></div>   
@if($Data->showsurveyresult == 1)
@if($Data->survey->showvotes == 1)
          @include('layouts.partials.survey.result',[
                  'survey' => $Data->survey, 
                  'items' => $Data->surveyitems, 
                ])
@else
          @include('layouts.partials.survey.thankyou',[
                  'survey' => $Data->survey, 
                  'items' => $Data->surveyitems, 
                ])
@endif            
@else
          @include('layouts.partials.survey.form',[
                  'survey' => $Data->survey, 
                  'items' => $Data->surveyitems, 
                ])
@endif            
      </div>
    </div>

<script>
//$(document).ready(function() {
//  $.ajax({
//    type: 'GET', 
//    url : "/survey/form/{{ $Data->survey->guid }}", 
//    success : function (data) {
//      $("#survey").html(data);
//    }
//  });
//});
</script>                   

</div>



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



