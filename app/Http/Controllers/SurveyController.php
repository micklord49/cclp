<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;

use App\Contact;
use App\Survey;
use App\SurveyItem;
use App\SurveyResponse;
use App\SurveyResponseItem;

use App\ViewModels\Managers\SurveyManager;

use Illuminate\Support\Facades\Log;

class SurveyController extends Controller
{
    //

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Branch  $branch
     * @return \Illuminate\Http\Response
     */
    public function edit($guid)
    {
        $survey = Survey::find($guid);
        $survey->items = SurveyItem::where("owner",$guid)->orderBy('order')->get();
        foreach($survey->items as $item)
        {

        }

        return $survey->toJson();
    }

    public function update(Request $request)
    {
        $this->store($request);
    }

    public function store(Request $request)
    {
        //
        if($request->guid!="")
        {
            //  Update blog post
            $survey = Survey::find($request->guid);

            if(isset($request->description))     $survey->description=$request->description;
            if(isset($request->active))     $survey->active=$request->active;
            if(isset($request->showvotes))     $survey->showvotes=$request->showvotes;
        }
        else
        {
            //  Create blog post
            $survey = new Survey;
            $survey->guid = uniqid("SRV");
            $survey->owner=$request->owner;
        }
        if(isset($request->name))     $survey->name=$request->name;
        $survey->save();        
    }

    public function items($owner)
    {
        $data = new \stdClass();
        $data->items = SurveyItem::where("owner",$owner)->orderBy('order')->get();  
        return json_encode($data);      
    }

    public function saveitem(Request $request)
    {
        //
        $survey = SurveyItem::find($request->guid);

        if(isset($request->name))     $survey->name=$request->name;
        if(isset($request->type))     $survey->type=$request->type;
        if(isset($request->options))     $survey->options=$request->options;

        $survey->save();        
    }

    public function newitem(Request $request)
    {
        $count = SurveyItem::where('owner',$request->owner)->count();
        $count++;
        $survey = new SurveyItem;
        $survey->guid = uniqid("SVI");
        $survey->owner=$request->owner;
        $survey->name=$request->name;
        $survey->type=$request->type;
        $survey->order=$count;
        $survey->save();
    }

    public function getitem($guid)
    {
        $data = SurveyItem::find($guid);
        return $data;
    }

    public function ownersearch($perpage,$page,$owner)
    {
        $clpGuid = config('appsettings.clpGUID');

        $data = new \stdClass();
        
        app('debugbar')->disable();


        $data->data = Survey::select('guid','name','active')->where("owner",$owner)->skip($perpage*($page-1))->take($perpage)->get();        
        $data->page = $page;
        $data->count = Survey::where("owner",$owner)->count();
        foreach($data->data as $survey)
        {
            $survey->edit = !$survey->active;
            if($survey->active)
            {
                $survey->responses = SurveyResponse::where("owner",$survey->guid)->count();
            }
            else
            {
                $survey->responses = "";
            }
        }

        return(json_encode($data));
    }

    public function resultsearch($perpage,$page,$surveyguid)
    {
        $clpGuid = config('appsettings.clpGUID');

        $data = new \stdClass();
        
        app('debugbar')->disable();

        $survey = Survey::where("owner",$surveyguid)->get();        
        $items = SurveyItem::where('owner',$surveyguid)->get();
        $responses = SurveyResponse::where("survey",$surveyguid)->skip($perpage*($page-1))->take($perpage)->get();
        $data->data = []; 
        $data->page = $page;
        $data->count = SurveyResponse::where("survey",$surveyguid)->skip($perpage*($page-1))->take($perpage)->count();
        foreach($responses as $response)
        {

            $i = new \stdClass();
            foreach($items as $item)
            {
                if($item->type==3)
                {
                    $name = $item->guid;
                    $ri = SurveyResponseItem::where('response',$response->guid)->where('surveyitem',$item->guid)->get();
                    if(count($ri)==0)
                    {
                        $name = $item->guid . "-agerange";
                        $i->$name = "";
                        $name = $item->guid . "-lgbt";
                        $i->$name = "";
                        $name = $item->guid . "-bame";
                        $i->$name = "";
                        $name = $item->guid . "-resident";
                        $i->$name = "";
                        $name = $item->guid . "-housing";
                        $i->$name = "";
                        $name = $item->guid . "-employment";
                        $i->$name = "";

                    }  
                    else
                    {
                        $value = $ri[0]->value;
                        $contact = Contact::where('guid',$value)->firstOrFail();
                        $name = $item->guid . "-agerange";
                        $i->$name = $contact->agerange;
                        $name = $item->guid . "-lgbt";
                        $i->$name = $contact->lgbt;
                        $name = $item->guid . "-bame";
                        $i->$name = $contact->bame;
                        $name = $item->guid . "-resident";
                        $i->$name = $contact->resident;
                        $name = $item->guid . "-housing";
                        $i->$name = $contact->housing;
                        $name = $item->guid . "-employment";
                        $i->$name = $contact->employment;
                    }
                }
                else
                {
                    $name = $item->guid;
                    $ri = SurveyResponseItem::where('response',$response->guid)->where('surveyitem',$item->guid)->get();
                    if(count($ri)==0)  $value = "";
                    else            $value = $ri[0]->value;
                    $i->$name = $value;
                }


            }
            array_push($data->data,$i);
        }

        return(json_encode($data));
    }


    public function ownerdir($owner)
    {
        $clpGuid = config('appsettings.clpGUID');

        $data = new \stdClass();
        
        app('debugbar')->disable();

        $data->data = Survey::select('guid','name','active')->where("owner",$owner)->get();        
        foreach($data->data as $survey)
        {
            $survey->items = SurveyItem::where("owner",$survey->guid)->get();        
        }

        return(json_encode($data));
    }

    public function showform(Request $request,$survey)
    {
        if($request->cookie($survey) != null)        return $this->showformresult($survey);
        return $this->showformentry($survey);
    }

    public function showformresult($survey)
    {
        $items = SurveyManager::get($survey)->itemdefinition();
        return view('layouts.partials.survey.result',[
            'survey' => Survey::find($survey),
            'items' => $items
          ]);
    }


    public function showformentry($survey)
    {
        $items = SurveyManager::get($survey)->itemdefinition();
        return view('layouts.partials.survey.form',[
            'survey' => Survey::find($survey),
            'items' => $items
          ]);
    }

    public function submit(Request $form,$guid)
    {
        $sm = SurveyManager::get($guid);
        $newguid = $sm->store($form);

        $minutes = time()+60*60*24*30;
        //Cookie::queue(Cookie::make($guid, $newguid, $minutes));
        $items = $sm->itemresult();
        return view('layouts.partials.survey.result',[
            'survey' => Survey::find($guid),
            'items' => $items
          ]);
    }

}
