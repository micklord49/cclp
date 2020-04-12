<div class="col-md-4">
    <div class="team-player">
    <div class="card"   style="cursor:pointer" onclick="document.location='/campaign/{{ $campaign->guid }}';return false;">
        <div class="card-header card-header-warning">
        <div class="card-icon">
          <div class="card-title">
            {{ $campaign->title }}
          </div>
        </div>
      </div>
        <img style="margin: 5%; width: 90%; " src="{{ $campaign->image }}" alt="Thumbnail Image" class="img-raised rounded card-img-top">
        <div class="card-body">
            <p class="card-description">{{ $campaign->subtitle }}</p>
        </div>
        <div class="card-footer justify-content-center">
            @if(isset($Data->facebook))
                <a href="{{ $Data->facebook }}" class="btn btn-just-icon btn-link btn-facebook"><i class="fa fa-facebook"></i></a>
            @endif
            @if(isset($Data->instagram))
                <a href="{{ $Data->instagram }}" class="btn btn-just-icon btn-link btn-instagram"><i class="fa fa-instagram"></i></a>
            @endif
            @if(isset($Data->twitter))
                <a href="{{ $Data->twitter }}" class="btn btn-just-icon btn-link btn-twitter"><i class="fa fa-twitter"></i></a>
            @endif
            @if(isset($Data->youtube))
                <a href="{{ $Data->youtube }}" class="btn btn-just-icon btn-link btn-youtube"><i class="fa fa-youtube"></i></a>
            @endif
        </div>
    </div>
    </div>
</div>
