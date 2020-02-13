<div class="col-md-4">
    <div class="card">
        <div class="card-header card-header-text card-header-primary">
            <div class="card-text">
                <h4 class="card-title">{{ $event->title }}</h4>
            </div>
        </div>
        <div class="card-body">
            <p class="card-description">
                {{ $event->subtitle }}<br/>

                {{ \Carbon\Carbon::parse($event->starttime)->format('l d M Y') }}<br/>
                From <b>{{ \Carbon\Carbon::parse($event->starttime)->format('H:i') }}</b>
                until
                <b>{{ \Carbon\Carbon::parse($event->endtime)->format('H:i') }}</b>
            </p>
        </div>
        <div class="card-footer justify-content-end">
            <button class="btn btn-info btn-fab btn-round">
                <a href="{{ $eventlink }}"><i class="material-icons">calendar_today</i></a>
            </button>
        </div>
    </div>
</div>

