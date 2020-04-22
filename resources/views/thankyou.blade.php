@extends('layouts.profile')

@section('content')

<div class="page-header header-filter" data-parallax="true" style="background-image: url('/images/thanks.png');"></div>
  <div class="main main-raised">
    <div class="profile-content">
      <div class="container">
        <div class="row">
          <div class="col-md-6 ml-auto mr-auto">
            <div class="profile">
              <div class="avatar">
                <img src="/images/block-thanks.png" alt="Circle Image" class="img-raised rounded-circle img-fluid">
              </div>
              <div class="name">
                <h3 class="title">{{ $Data->msg = '' ? "Thank you for your message." : $Data->msg }}</h3>
              </div>
            </div>
          </div>
        </div>
        <div class="description text-center">
          <p></p>
        </div>
      </div>
    </div>
  </div>
</div>



@include('layouts.partials.footer',[])


@endsection

