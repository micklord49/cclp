<div id="SRVFRMCNT">
<form  id="SRVFRM" onsubmit="submitSurvey(event)">
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

@if($item->type==3)
<div class="form-row">
<div class="align-middle">
<div class="form-group">
    <label for="{{ $item->guid }}-email">Email address</label>
    <input type="email" class="form-control" id="{{ $item->guid }}-email" name="{{ $item->guid }}-email"  aria-describedby="emailHelp" placeholder="Enter email address">
    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
</div>

</div>
</div>

@if($item->getresident)
<div class="form-row">
<div class="align-middle">
<div class="form-check">
      <label class="form-check-label">
          <input class="form-check-input" type="checkbox" value="" id="{{ $item->guid }}-resident" name="{{ $item->guid }}-resident">
          Are you a local resident?
          <span class="form-check-sign">
              <span class="check"></span>
          </span>
      </label>
  </div>
  </div>
</div>
@endif




@if($item->getgender)
<div class="form-row">
<div class="align-middle">
Gender
<div class="form-check form-check-radio">
  <label class="form-check-label">
    <input class="form-check-input" type="radio" name="{{$item->guid}}-gender" value="F"> Female
    <span class="circle">
        <span class="check"></span>
    </span>
  </label>
</div>
<div class="form-check form-check-radio">
  <label class="form-check-label">
    <input class="form-check-input" type="radio" name="{{$item->guid}}-gender" value="M"> Male
    <span class="circle">
        <span class="check"></span>
    </span>
  </label>
</div>
<div class="form-check form-check-radio">
  <label class="form-check-label">
    <input class="form-check-input" type="radio" name="{{$item->guid}}-gender" value="N"> Non-binary/third gender
    <span class="circle">
        <span class="check"></span>
    </span>
  </label>
</div>
<div class="form-check form-check-radio">
  <label class="form-check-label">
    <input class="form-check-input" type="radio" name="{{$item->guid}}-gender" value="X"> Prefer not to say
    <span class="circle">
        <span class="check"></span>
    </span>
  </label>
</div>

  </div>
</div>
@endif

@if($item->getagerange)
<div class="form-row">
<div class="align-middle">
Age
<div class="form-check form-check-radio">
  <label class="form-check-label">
    <input class="form-check-input" type="radio" name="{{$item->guid}}-age" value="0-17"> Under 18
    <span class="circle">
        <span class="check"></span>
    </span>
  </label>
</div>
<div class="form-check form-check-radio">
  <label class="form-check-label">
    <input class="form-check-input" type="radio" name="{{$item->guid}}-age" value="18-29"> 18-29
    <span class="circle">
        <span class="check"></span>
    </span>
  </label>
</div>
<div class="form-check form-check-radio">
  <label class="form-check-label">
    <input class="form-check-input" type="radio" name="{{$item->guid}}-age" value="30-39"> 30-39
    <span class="circle">
        <span class="check"></span>
    </span>
  </label>
</div>
<div class="form-check form-check-radio">
  <label class="form-check-label">
    <input class="form-check-input" type="radio" name="{{$item->guid}}-age" value="40-49"> 40-49
    <span class="circle">
        <span class="check"></span>
    </span>
  </label>
</div>
<div class="form-check form-check-radio">
  <label class="form-check-label">
    <input class="form-check-input" type="radio" name="{{$item->guid}}-age" value="50-59"> 50-59
    <span class="circle">
        <span class="check"></span>
    </span>
  </label>
</div>
<div class="form-check form-check-radio">
  <label class="form-check-label">
    <input class="form-check-input" type="radio" name="{{$item->guid}}-age" value="60-69"> 60-69
    <span class="circle">
        <span class="check"></span>
    </span>
  </label>
</div>
<div class="form-check form-check-radio">
  <label class="form-check-label">
    <input class="form-check-input" type="radio" name="{{$item->guid}}-age" value="70+"> 70 or over
    <span class="circle">
        <span class="check"></span>
    </span>
  </label>
</div>
<div class="form-check form-check-radio">
  <label class="form-check-label">
    <input class="form-check-input" type="radio" name="{{$item->guid}}-age" value="X"> Prefer not to say
    <span class="circle">
        <span class="check"></span>
    </span>
  </label>
</div>

  </div>
</div>
@endif


@if($item->getemployment)
<div class="form-row">
<div class="align-middle">
Gender
<div class="form-check form-check-radio">
  <label class="form-check-label">
    <input class="form-check-input" type="radio" name="{{$item->guid}}-employment" value="E"> Full time employment
    <span class="circle">
        <span class="check"></span>
    </span>
  </label>
</div>
<div class="form-check form-check-radio">
  <label class="form-check-label">
    <input class="form-check-input" type="radio" name="{{$item->guid}}-employment" value="S"> Self Employed
    <span class="circle">
        <span class="check"></span>
    </span>
  </label>
</div>
<div class="form-check form-check-radio">
  <label class="form-check-label">
    <input class="form-check-input" type="radio" name="{{$item->guid}}-employment" value="P"> Part Time Employment
    <span class="circle">
        <span class="check"></span>
    </span>
  </label>
</div>
<div class="form-check form-check-radio">
  <label class="form-check-label">
    <input class="form-check-input" type="radio" name="{{$item->guid}}-employment" value="U"> Unwaged
    <span class="circle">
        <span class="check"></span>
    </span>
  </label>
</div>
<div class="form-check form-check-radio">
  <label class="form-check-label">
    <input class="form-check-input" type="radio" name="{{$item->guid}}-employment" value="R"> Retired
    <span class="circle">
        <span class="check"></span>
    </span>
  </label>
</div>
<div class="form-check form-check-radio">
  <label class="form-check-label">
    <input class="form-check-input" type="radio" name="{{$item->guid}}-employment" value="O"> Other
    <span class="circle">
        <span class="check"></span>
    </span>
  </label>
</div>
<div class="form-check form-check-radio">
  <label class="form-check-label">
    <input class="form-check-input" type="radio" name="{{$item->guid}}-employment" value="X"> Prefer not to say
    <span class="circle">
        <span class="check"></span>
    </span>
  </label>
</div>

  </div>
</div>
@endif

@if($item->gethousing)
<div class="form-row">
<div class="align-middle">
Housing Status
<div class="form-check form-check-radio">
  <label class="form-check-label">
    <input class="form-check-input" type="radio" name="{{$item->guid}}-housing" value="O"> Home Owner
    <span class="circle">
        <span class="check"></span>
    </span>
  </label>
</div>
<div class="form-check form-check-radio">
  <label class="form-check-label">
    <input class="form-check-input" type="radio" name="{{$item->guid}}-housing" value="P"> Private Tennant
    <span class="circle">
        <span class="check"></span>
    </span>
  </label>
</div>
<div class="form-check form-check-radio">
  <label class="form-check-label">
    <input class="form-check-input" type="radio" name="{{$item->guid}}-housing" value="S"> Social Housing (Council/Housing Association)
    <span class="circle">
        <span class="check"></span>
    </span>
  </label>
</div>
<div class="form-check form-check-radio">
  <label class="form-check-label">
    <input class="form-check-input" type="radio" name="{{$item->guid}}-housing" value="H"> Homeless
    <span class="circle">
        <span class="check"></span>
    </span>
  </label>
</div>
<div class="form-check form-check-radio">
  <label class="form-check-label">
    <input class="form-check-input" type="radio" name="{{$item->guid}}-housing" value="X"> Prefer not to say
    <span class="circle">
        <span class="check"></span>
    </span>
  </label>
</div>

  </div>
</div>
@endif

@if($item->getmember)
<div class="form-row">
<div class="align-middle">
<div class="form-group">
    <label for="{{ $item->guid }}-member">Labour Membership Number</label>
    <input type="text" class="form-control" id="{{ $item->guid }}-member" name="{{ $item->guid }}-member"  aria-describedby="membership" placeholder="########">
</div>
</div>
</div>
@endif


@if($item->getlgbt)
<div class="form-row">
<div class="align-middle">
Do you self identify as a member of the LGBTQ+ community?
<div class="form-check form-check-radio">
  <label class="form-check-label">
    <input class="form-check-input" type="radio" name="{{$item->guid}}-lgbt" value="Y"> Yes
    <span class="circle">
        <span class="check"></span>
    </span>
  </label>
</div>
<div class="form-check form-check-radio">
  <label class="form-check-label">
    <input class="form-check-input" type="radio" name="{{$item->guid}}-lgbt" value="N"> No
    <span class="circle">
        <span class="check"></span>
    </span>
  </label>
</div>
<div class="form-check form-check-radio">
  <label class="form-check-label">
    <input class="form-check-input" type="radio" name="{{$item->guid}}-lgbt" value="A"> No, but identify as ally
    <span class="circle">
        <span class="check"></span>
    </span>
  </label>
</div>
<div class="form-check form-check-radio">
  <label class="form-check-label">
    <input class="form-check-input" type="radio" name="{{$item->guid}}-lgbt" value="X"> Prefer not to say
    <span class="circle">
        <span class="check"></span>
    </span>
  </label>
</div>

  </div>
</div>
@endif

@if($item->getbame)
<div class="form-row">
<div class="align-middle">
Do you self identify as a member of the BAME community?

<div class="form-check form-check-radio">
  <label class="form-check-label">
    <input class="form-check-input" type="radio" name="{{$item->guid}}-bame" value="Y"> Yes
    <span class="circle">
        <span class="check"></span>
    </span>
  </label>
</div>
<div class="form-check form-check-radio">
  <label class="form-check-label">
    <input class="form-check-input" type="radio" name="{{$item->guid}}-bame" value="N"> No
    <span class="circle">
        <span class="check"></span>
    </span>
  </label>
</div>
<div class="form-check form-check-radio">
  <label class="form-check-label">
    <input class="form-check-input" type="radio" name="{{$item->guid}}-bame" value="A"> Prefer not to say
    <span class="circle">
        <span class="check"></span>
    </span>
  </label>
</div>


  </div>
</div>
@endif

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
}
</script>

@endif


@endforeach
            <div class="row">
              <div class="col-md-4 ml-auto mr-auto text-center">
                <button class="btn btn-primary btn-raised" >
                  Submit
                </button>
              </div>
            </div>
        </div>
      </div>
    </div>
</form>
</div>

<script>
$(document).ready(function() {
  $("SRVFRM").submit(
    function(e){
      alert("Submitted");
    });
});

function submitSurvey(e)
{
  var action = "/survey/submit/{{ $survey->guid }}";
  var d = $("#SRVFRM").serialize();

  e.preventDefault();
  $.ajax({ // create an AJAX call...
        data: $("#SRVFRM").serialize(), // get the form data
        type: 'POST', // GET or POST
        url: action, // the file to call
        success: function(response) { // on success..
            $('#SRVFRMCNT').html(response); // update the DIV
        },
        error: function(response) {
          $('#SRVFRMCNT').html("ERROR SUBMITING"); // update the DIV
        }
    });
}

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
}
</script>                   
