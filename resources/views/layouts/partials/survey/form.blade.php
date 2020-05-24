

<form method="POST" action="/survey/submit/{{ $survey->guid }}">
@csrf
@honeypot
    <div class="section section-survey" id="surveyform">
      <div class="row">
        <div class="col-md-8 ml-auto mr-auto">
          <h2 class="text-center title">Survey</h2>
          <h3 class="text-center description">{!! $survey->description !!}</h3>


@foreach($items as $item)
<div class="form-row">

<h4>{{ $item->name }}</h4>
</div>


@if($item->type==1)
<input type="hidden" id="{{ $item->guid }}-result" name="{{ $item->guid }}-result" >
@foreach($item->votes as $vote)
<div class="form-row">
<button type="button" id="{{ $item->guid }}-{{ $vote->index }}-button" onClick="voteclick(this,'btn-{{ $vote->colour }}','{{ $item->guid }}',{{ $vote->index}})" class="btn">
@if($vote->icon != '')
  <i class="material-icons">{{ $vote->icon }}</i>
@endif
{{ $vote->text }}
</button>
</div>
@endforeach
@endif

@if($item->type==4)
<input type="hidden" id="{{ $item->guid }}-result" name="{{ $item->guid }}-result" >
<div class="form-row" style="height:60px;">
<span class="align-middle" style="padding-right:60px;padding-top:15px;">{{ $item->minlabel }}</span>
<div class="align-middle">
@for ($i = 1; $i <= $item->steps; $i++)
<div class="form-check form-check-radio form-check-inline">
  <label class="form-check-label">
    <input class="form-check-input" type="radio" name="{{$item->guid}}" onclick="setsurveyrange_{{$item->guid}}({{$i}});" id="{{$item->guid}}-{{$i}}" value="{{$i}}">
    <span class="circle">
        <span class="check"></span>
    </span>
  </label>
</div>
@endfor
</div>
<div class="align-middle"  style="padding-left:20px;padding-top:15px;">{{ $item->maxlabel }}</div>
</div>
<script>
function setsurveyrange_{{$item->guid}}(val)
{
  $("#{{$item->guid}}-result").val(val);
  console.log("Setting {{$item->guid}}-result to "+val);
}
</script>

@endif


@endforeach
            <div class="row">
              <div class="col-md-4 ml-auto mr-auto text-center">
                <button class="btn btn-primary btn-raised">
                  Submit
                </button>
              </div>
            </div>
        </div>
      </div>
    </div>
</form>


<script>
$(document).ready(function() {
});

function voteclick(elem,setclass,itemguid,index)
{
  id="#" + elem.id;
  val="#" + itemguid + "-result";
  $(val).val('');
  if($(id).hasClass(setclass))
  {
    $(id).removeClass(setclass);
    return;
  }

  $("button[id*='" + itemguid + "']").removeClass('btn-success');
  $("button[id*='" + itemguid + "']").removeClass('btn-danger');
  $("button[id*='" + itemguid + "']").removeClass('btn-success');
  $("button[id*='" + itemguid + "']").removeClass('btn-success');

  $(id).addClass(setclass);
  $(val).val(index);
  console.log("Setting "+val+" to "+index);
}
</script>                   
