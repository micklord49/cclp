@if($Data->twitterfeed || $Data->facebookfeed)
<div class="section text-center">
<h2 class="title">Social Media</h2>
</div>
@endif

<div class="container">
<div class="row justify-content-center">


@if($Data->twitterfeed)

<div class="col-md-6">
    <div class="team-player">
        <div class="card" style="cursor:pointer" onclick="document.location='{{ $Data->twitter }}';return false;">
            <div class="card-header card-header-info">
                <div class="card-icon">
                    <div class="card-title">
                        {{ $intro }} Twitter Feed
                    </div>
                </div>
            </div>
            <div class="card-body">

                    {!! $Data->twitterembed !!}

            </div>
        </div>
    </div>
</div>

@endif

@if($Data->facebookfeed)

<div class="col-md-6">
    <div class="team-player">
        <div class="card" style="cursor:pointer" onclick="document.location='{{ $Data->facebook }}';return false;">
            <div class="card-header card-header-info" style="background: linear-gradient(60deg, #3b5998, #4e71ba);">
                <div class="card-icon">
                    <div class="card-title">
                    {{ $intro }} Facebook Feed
                    </div>
                </div>
            </div>
            <div class="card-body">

                <div class="fb-page" data-href="https://www.facebook.com/{{ $Data->facebookfeed }}/" data-tabs="timeline" data-width="500" data-height="400" data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true" adapt_container_width="true"><blockquote cite="https://www.facebook.com/WestminsterLabour/" class="fb-xfbml-parse-ignore"><a href="https://www.facebook.com/{{ $Data->facebookfeed }}/">{{ $Data->name }}</a></blockquote></div>
                </div>

            </div>
        </div>
    </div>
</div>

@endif

</div>
</div>