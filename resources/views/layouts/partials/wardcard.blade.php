<div class="col-md-4">
    <div class="team-player">
    <div class="card card-plain">
        <div class="col-md-6 ml-auto mr-auto"  style="cursor:pointer" onclick="document.location='/wards/{{ $ward->guid }}';return false;">
            <img src="{{ $ward->image }}" alt="Thumbnail Image" class="img-raised rounded img-fluid">
        </div>
        <h4 class="card-title">{{ $ward->name }}
            <br>
            <small class="card-description text-muted"></small>
        </h4>
        <div class="card-body">
            <p class="card-description">{{ $ward->name }}</p>
        </div>
        <div class="card-footer justify-content-center">
            @if(isset($ward->facebook))
                <a href="{{ $ward->facebook }}" class="btn btn-just-icon btn-link btn-facebook"><i class="fa fa-facebook"></i></a>
            @endif
            @if(isset($ward->instagram))
                <a href="{{ $ward->instagram }}" class="btn btn-just-icon btn-link btn-instagram"><i class="fa fa-instagram"></i></a>
            @endif
            @if(isset($ward->twitter))
                <a href="{{ $ward->twitter }}" class="btn btn-just-icon btn-link btn-twitter"><i class="fa fa-twitter"></i></a>
            @endif
            @if(isset($ward->youtube))
                <a href="{{ $ward->youtube }}" class="btn btn-just-icon btn-link btn-youtube"><i class="fa fa-youtube"></i></a>
            @endif
        </div>
    </div>
    </div>
</div>
