    <div class="section section-survey" id="surveyform">
      <div class="row">
        <div class="col-md-8 ml-auto mr-auto">
          <h2 class="text-center title">Survey Result</h2>
          <h3 class="text-center description">{!! $survey->description !!}</h3>


@foreach($items as $item)


@if($item->type==1)

<div class="card" style="">
<div class="card-header card-header-text card-header-primary">{{ $item->name }}</div>
<div class="card-body">

@foreach($item->votes as $vote)
<h5 class="card-title">
@if($vote->icon != '')
  <i class="material-icons">{{ $vote->icon }}</i>
@endif
{{ $vote->text }} - {{ $vote->percent }}% ( {{ $vote->result }})
</h5>
@endforeach
  </div>
</div>

@endif

@if($item->type==4)
<div class="card" style="">
<div class="card-header card-header-text card-header-primary">{{ $item->name }}</div>
<div class="card-body">
<div class="barcontainer align-middle">
@for ($i = 1; $i <= $item->steps; $i++)
<div class="bar" style="height:{{ $item->votes[$i-1]->percent }}%;
                        left: {{ (100 / $item->steps)*($i-1) }}%;
                        width: {{ (100 / $item->steps) }}%">
    <div class="barlabel">
    {{ $item->votes[$i-1]->result }}
    </div>
</div>
@endfor
</div>
</div>
<div class="card-footer text-muted">
<p style="text-align: left; width:49%; display: inline-block;">{{ $item->minlabel }}</p>
<p style="text-align: right; width:50%;  display: inline-block;">{{ $item->maxlabel }}</p>

</div>

</div>
</div>

@endif

<div class="row">
</div>

@endforeach

        </div>
      </div>

<style>

.bar-container {
    height: 200px;
    width: 25px;

    background-color: #fff;
    float: left;

}

.barcontainer {
  position: relative;
  border-radius: 6px 6px 0 0;
  width: 60%;
  margin: 0 auto;
  height: 150px;
  min-height: 100px;
  max-height: 200px;
  min-width: 200px;
  max-width: 300px;
  z-index: 1;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.barcontainerheader {
  display: inline;
  position: absolute;
  width: 100%;
  padding-top: 3px;
  padding-bottom: 3px;
  background: #663399;
  border-bottom: 3px solid black;
  font-size: 1.5em;
  color: white;
  text-align: center;
  text-shadow: 2px 2px 0 black;
  z-index: 0;
}

.bar {
  position: absolute;
  display: inline-block;
  bottom: 0;
  border-radius: 3px 3px 0 0;
  background: linear-gradient(60deg,#26c6da,#0097a7);
  width: 24px;
  text-align: center;
  color: white;
  text-shadow: 1px 1px 0 black;
  box-shadow: 4px 0 8px #888;
}

.barlabel {
  position: absolute;
  bottom: 0;
  width: 100%;
  text-shadow: 1px 1px 0px black;
  color: white;
}

</style>
<script>
$(document).ready(function() {
});

</script>                   
