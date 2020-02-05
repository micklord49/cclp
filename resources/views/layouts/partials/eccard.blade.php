<div class="col-md-4">
  <div class="team-player">
    <div class="card card-plain">
      <div class="col-md-6 ml-auto mr-auto"  style="cursor:pointer" onclick="document.location='/user/{{ $ec->guid }}';return false;">
        <img src="{{ $ec->image }}" alt="Thumbnail Image" class="img-raised rounded img-fluid">
      </div>
      <h4 class="card-title">{{ $ec->name }}
        <br>
        <small class="card-description text-muted">{{ $ec->subtitle }} </small>
      </h4>
      <div class="card-body">
        <p class="card-description">{{ $ec->intro }}</p>
      </div>
      <div class="card-footer justify-content-center">
            @isset($ec->facebook)
                <i class="fa fa-facebook-square" style="cursor:pointer" onclick="document.location='{{ $ec->facebook }}';return false;"></i>
            @endisset
      </div>
    </div>
  </div>
</div>
