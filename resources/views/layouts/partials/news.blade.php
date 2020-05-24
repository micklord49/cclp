<div class="tab-pane text-center gallery" id="news">
<div class="row justify-content-center">

@foreach ($Data->news as $news)
    @isset($news->image)
        <div class="col-md-4"  style="cursor:pointer" onclick="document.location='/blog/{{ $news->guid }}';return false;">
            <div class="card bg-dark text-white">
                <img class="card-img" style="filter: brightness(50%);" src="{{ $news->image }}" alt="Card image">
                <div class="card-img-overlay">
                    <h4 class="card-title">{{ $news->title}}</h4>
                </div>
                <div class="card-body">
                    {{ $news->subtitle  ?? 'NO SUBTITLE' }}
                </div>
            </div>
        </div>
    @else
        <div class="col-md-4" style="cursor:pointer" onclick="document.location='/blog/{{ $news->guid }}';return false;">
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
@endforeach
</div>
</div>