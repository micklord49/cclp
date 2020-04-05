
@csrf
@honeypot
@if($list->type==1)

<div class="col-md-6">
<form method="POST" action="/list/sign/{{ $list->guid }}">
    <div class="card">
      <div class="card-header card-header-primary">
        <div class="card-icon">
          <i class="material-icons">subscriptions</i>
          <div class="card-title">
            {{ $list->subtitle }}
          </div>
        </div>
      </div>
        <div class="card-body">
          <div>
            {!! $list->description !!}
          </div>

          <div style="background-color: rgba(255,255,255,1); margin:10px; padding:10px">


          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">
                <i class="material-icons">face</i>
              </span>
            </div>
            <input id="name" name="name" type="text" class="form-control" placeholder="Name...">
          </div>
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">
                <i class="material-icons">mail</i>
              </span>
            </div>
            <input id="email" name="email" type="email" class="form-control" placeholder="Email...">
          </div>
@if($list->requestaddress)
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">
                <i class="material-icons">home</i>
              </span>
            </div>
            <input id="address1" name="address1" type="text" class="form-control" placeholder="Address Line 1...">
          </div>
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">
                <i class="material-icons">more_horiz</i>
              </span>
            </div>
            <input id="address2" name="address2" type="text" class="form-control" placeholder="Address Line 2...">
          </div>
@endif

          </div>


          <p class="card-text" style="font-style: italic;">If you have not previously verified your email address with us, you will recieve an email asking you to confirm your address. You will not get updates if you do not confirm.</p>
          <a href="javascript:;" class="btn btn-primary">Subscribe</a>
        </div>

    </div>
    </Form>
</div>




@elseif($list->type==3)

<div class="col-md-6">
<form method="POST" action="/list/sign/{{ $list->guid }}">
    <div class="card bg-dark text-white">
      <div class="card-header card-header-primary">
        <div class="card-icon">
          <i class="material-icons">description</i>
          <div class="card-title">
            {{ $list->subtitle }}
          </div>
        </div>
      </div>
        <div class="card-body">
          <div>
            {!! $list->description !!}
          </div>

          <div style="background-color: rgba(255,255,255,1); margin:10px; padding:10px">


          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">
                <i class="material-icons">face</i>
              </span>
            </div>
            <input id="name" name="name" type="text" class="form-control" placeholder="Name...">
          </div>
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">
                <i class="material-icons">mail</i>
              </span>
            </div>
            <input id="email" name="email" type="email" class="form-control" placeholder="Email...">
          </div>
@if($list->requestaddress)
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">
                <i class="material-icons">home</i>
              </span>
            </div>
            <input id="address1" name="address1" type="text" class="form-control" placeholder="Address Line 1...">
          </div>
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">
                <i class="material-icons">more_horiz</i>
              </span>
            </div>
            <input id="address2" name="address2" type="text" class="form-control" placeholder="Address Line 2...">
          </div>
@endif

          </div>


          <p class="card-text" style="font-style: italic;">If you have not previously verified your email address with us, you will recieve an email asking you to confirm your address. Your signature will not count if you do not confirm.</p>
          <a href="javascript:;" class="btn btn-primary">Sign the letter</a>
        </div>

    </div>
    </Form>
</div>

@else

<div class="col-md-6">
<form method="POST" action="/list/sign/{{ $list->guid }}">
    <div class="card">
      <div class="card-header card-header-success">
        <div class="card-icon">
          <i class="material-icons">playlist_add_check</i>
          <div class="card-title">
            {{ $list->subtitle }}
          </div>
        </div>
      </div>
        <div class="card-body">
          <div>
            {!! $list->description !!}
          </div>

          <div style="background-color: rgba(255,255,255,1); margin:10px; padding:10px">


          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">
                <i class="material-icons">face</i>
              </span>
            </div>
            <input id="name" name="name" type="text" class="form-control" placeholder="Name...">
          </div>
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">
                <i class="material-icons">mail</i>
              </span>
            </div>
            <input id="email" name="email" type="email" class="form-control" placeholder="Email...">
          </div>
@if($list->requestaddress)
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">
                <i class="material-icons">home</i>
              </span>
            </div>
            <input id="address1" name="address1" type="text" class="form-control" placeholder="Address Line 1...">
          </div>
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">
                <i class="material-icons">more_horiz</i>
              </span>
            </div>
            <input id="address2" name="address2" type="text" class="form-control" placeholder="Address Line 2...">
          </div>
@endif

          </div>


          <p class="card-text" style="font-style: italic;">If you have not previously verified your email address with us, you will recieve an email asking you to confirm your address. Your signature will not count if you do not confirm.</p>
          <a href="javascript:;" class="btn btn-primary">Sign the Petition</a>
        </div>

    </div>
    </Form>
</div>





@endif
