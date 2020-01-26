<div class="row">

@foreach ($Data->news->items as $news)
    @isset($news->image)
        <div class="col-md-6">
            <div class="card bg-dark text-white">
                <img class="card-img" src="{{ $news->image }}" alt="Card image">
                <div class="card-img-overlay">
                    <h4 class="card-title">{{ $news->title}}</h4>
                </div>
                <div class="card-body">
                    {{ $news->subtitle  ?? 'NO SUBTITLE' }}
                </div>
            </div>
        </div>
    @else
        <div class="col-md-6">
            <div class="card">
                <div class="card-header card-header-text card-header-primary">
                    <h4 class="card-title">{{ $news->title }}</h4>
                </div>
                <div class="card-body">
                    {{ $news->subtitle  ?? 'NO SUBTITLE' }}
                </div>
            </div>
        </div>
    @endisset
    @if ($loop->even  && !$loop->last)
        </div>
        <div class="row"
    @endif
@endforeach
</div>