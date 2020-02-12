<div class="col-md-4">
    <div class="team-player">
    <div class="card card-plain">
        <div class="col-md-6 ml-auto mr-auto"  style="cursor:pointer" onclick="document.location='/campaign/{{ $campaign->guid }}';return false;">
            <img src="{{ $campaign->image }}" alt="Thumbnail Image" class="img-raised rounded img-fluid">
        </div>
        <h4 class="card-title">{{ $campaign->title }}
            <br>
            <small class="card-description text-muted"></small>
        </h4>
        <div class="card-body">
            <p class="card-description">{{ $campaign->subtitle }}</p>
        </div>
        <div class="card-footer justify-content-center">
            @isset($campaign->facebook)
                <i class="fa fa-facebook-square" style="cursor:pointer" onclick="document.location='{{ $branch->facebook }}';return false;"></i>
            @endisset
        </div>
    </div>
    </div>
</div>
