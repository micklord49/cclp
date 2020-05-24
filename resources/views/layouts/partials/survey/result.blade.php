    <div class="section section-survey" id="surveyform">
      <div class="row">
        <div class="col-md-8 ml-auto mr-auto">
          <h2 class="text-center title">Survey Result</h2>
          <h3 class="text-center description">{!! $survey->description !!}</h3>


@foreach($items as $item)
<div class="form-row">

<h4>{{ $item->name }}</h4>
</div>


@if($item->type==1)
@foreach($item->votes as $vote)
<div class="form-row">
@if($vote->icon != '')
  <i class="material-icons">{{ $vote->icon }}</i>
@endif
{{ $vote->text }} - {{ $vote->percent }}% ( {{ $vote->result }})
</div>
@endforeach
@endif

@if($item->type==4)
<div class="form-row" style="height:160px;">
<span class="align-middle" style="padding-right:10px;padding-top:15px;">{{ $item->minlabel }}</span>
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
<div class="align-middle"  style="padding-left:10px;padding-top:15px;">{{ $item->maxlabel }}</div>
</div>

@endif


@endforeach

        </div>
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
  border: 3px solid black;
  border-radius: 5px 5px 0 0;
  width: 60%;
  margin: 0 auto;
  height: 150px;
  min-height: 100px;
  max-height: 200px;
  min-width: 200px;
  max-width: 300px;
  z-index: 1;
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
  border: 1px solid black;
  border-radius: 6px 6px 0 0;
  background: #663399;
  width: 24px;
  text-align: center;
  color: white;
  text-shadow: 1px 1px 0 black;
  box-shadow: 4px 0 8px #888;
}

.barlabel {
  position: absolute;
  border-top: 2px solid black;
  background: #888;
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
