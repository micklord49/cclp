<div class="col-md-4 align-self-center">
    <div class="team-player">
        <div class="card card-plain">
            <div class="col-md-6 ml-auto mr-auto"  style="cursor:pointer" onclick="document.location='/councillor/{{ $councillor->guid }}';return false;">
                <img src="{{ $councillor->image }}" alt="Thumbnail Image" class="img-raised rounded img-fluid">
            </div>
            <h4 class="card-title text-center">{{ $councillor->name }}
                <br>
                <small class="card-description text-muted">{{ $councillor->ward }} - <i>{{ $councillor->council }}</i></small>
            </h4>
            <div class="card-body">
                <p class="card-description">{{ $councillor->intro }}</p>
            </div>
            <div class="card-footer justify-content-center">
                @isset($councillor->facebook)
                <i class="fa fa-facebook-square" style="cursor:pointer" onclick="document.location='{{ $councillor->facebook }}';return false;"></i>
                @endisset
                @isset($councillor->twitter)
                <i class="fa fa-twitter-square" style="cursor:pointer" onclick="document.location='{{ $councillor->twitter }}';return false;"></i>
                @endisset
                @isset($councillor->youtube)
                <i class="fa fa-youtube-square" style="cursor:pointer" onclick="document.location='{{ $councillor->youtube }}';return false;"></i>
                @endisset
                @isset($councillor->instagram)
                <i class="fa fa-instagram-square" style="cursor:pointer" onclick="document.location='{{ $councillor->instagram }}';return false;"></i>
                @endisset
            </div>
        </div>
    </div>
</div>
