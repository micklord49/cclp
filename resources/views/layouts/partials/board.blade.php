<div class="col-md-6">
    <div class="card">
        <div class="card-header">
            <button class="btn btn-primary btn-fab btn-fab-mini btn-round"
                onclick="document.location='{{ $board->link }}';return false;">
                <i class="material-icons">edit</i>
            </button>
            <button class="btn btn-info btn-fab btn-fab-mini btn-round"
                onclick="document.location='{{ $board->view }}';return false;">
                <i class="material-icons">visibility</i>
            </button>

            {{ $board->description }}
        
        </div>
        <div class="col-md-12 ml-auto mr-auto"  style="cursor:pointer" onclick="document.location='/branch/{{ $board->guid }}';return false;">
        </div>
        <h4 class="card-title">
            &nbsp;
        </h4>
        <div class="card-img-top" style="width:100%; height: 200px;" id="chart_{{ $board->guid }}"></div>
        <div class="card-body">
            <p class="card-description">
            <i class="material-icons md-18">link</i>
            @if($board->visits->lastweek > 0)
                {{ $board->visits->lastweek }} last week
            @else
                No visits last week.
            @endif
            ,
            @if($board->visits->lastmonth > 0)
                {{ $board->visits->lastmonth }} last month
            @else
                No visits last month.
            @endif
            .
            </p>

            @if($board->unread > 0)
                <p class="card-description"><i class="material-icons md-18 md-yellow }" >mail</i>{{ $board->unread }} unread messages</p>
            @else
                <p class="card-description"><i class="material-icons md-18">mail</i>No unread messages</p>
            @endif
            @if($board->blog->total > 0)
                <p class="card-description"><i class="material-icons md-18">chat</i> News posts {{ $board->blog->last7 }} last week, {{ $board->blog->last28 }} last month </p>
            @else
                <p class="card-description"><i class="material-icons md-18">chat</i> No news posted yet.</p>
            @endif
        </div>
        <div class="card-footer justify-content-center">
            @if(isset($board->facebook))
                <a href="{{ $board->facebook }}" class="btn btn-just-icon btn-link btn-facebook"><i class="fa fa-facebook"></i></a>
            @endif
            @if(isset($board->instagram))
                <a href="{{ $board->instagram }}" class="btn btn-just-icon btn-link btn-instagram"><i class="fa fa-instagram"></i></a>
            @endif
            @if(isset($board->twitter))
                <a href="{{ $board->twitter }}" class="btn btn-just-icon btn-link btn-twitter"><i class="fa fa-twitter"></i></a>
            @endif
            @if(isset($board->youtube))
                <a href="{{ $board->youtube }}" class="btn btn-just-icon btn-link btn-youtube"><i class="fa fa-youtube"></i></a>
            @endif
        </div>
    </div>
</div>
