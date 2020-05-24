<?php


namespace App\ViewModels\Managers;

use App\Survey;
use App\SurveyItem;
use App\SurveyResponse;
use App\SurveyResponseItem;

use Illuminate\Support\Facades\Log;


class SurveyManager
{
    public static function get($guid)
    {
        return new ISurvey($guid);
    }
}

class ISurvey
{
    private $guid;

    public function __construct($guid)
    {
        $this->guid = $guid;
    }

    public function store($response)
    {
        Log::debug($response);

        $items = SurveyItem::where('owner',$this->guid)->get();
        $guid = uniqid("SVR");
        $r = new SurveyResponse;
        $r->guid = $guid;
        $r->survey = $this->guid;
        $r->save();
        foreach($items as $item)
        {
            $in = $item->guid . "-result";
            $i = new SurveyResponseItem;
            $i->guid = uniqid("SRI");
            $i->response = $guid;
            $i->surveyitem = $item->guid;
            $i->value = $response->$in;
            $i->save();
        }
        return $guid;
    }

    public function itemresult()
    {
        $items = SurveyItem::where('owner',$this->guid)->get();
        foreach($items as $item)
        {
            $icons = $this->icons();
            $colours = $this->colours();
            switch($item->type)
            {
                case 1:
                    $votes = explode(";",$item->options);
                    $v = array();
                    $index = 0;
                    $total = 0;
                    foreach($votes as $vote)
                    {
                        $i = new \stdClass();
                        $i->icon = $icons[substr($vote,0,1)];
                        $i->colour = $colours[substr($vote,0,1)];
                        $i->text = substr($vote,1);
                        $i->index = $index++;
                        $i->result = SurveyResponseItem::where('surveyitem',$item->guid)->where('value',$i->index)->count();
                        $total += $i->result;
                        $v[]=$i;
                    }
                    if($total > 0)
                    {
                        foreach($v as $vote)
                        {
                            $vote->percent = ($vote->result / $total)*100;
                        }
                    }
                    $item->votes = $v;
                break;
                case 4:
                    if($item->options ?? "" == "") 
                    {
                        $item->steps = 5;
                        $item->minlabel = 'Poor';
                        $item->maxlabel = 'Excellent';
                    }
                    else
                    {
                        $options = explode(";",$item->options);
                    
                        $item->steps = $options[0];
                        $item->minlabel = $options[1];
                        $item->maxlabel = $options[2];
                    }
                    $v = array();
                    $total = 0;
                    for($index=1;$index<=$item->steps;$index++)
                    {
                        $i = new \stdClass();
                        $i->index = $index;
                        $i->result = SurveyResponseItem::where('surveyitem',$item->guid)->where('value',$index)->count();
                        $total += $i->result;
                        $v[$index-1]=$i;
                    }
                    if($total > 0)
                    {
                        foreach($v as $vote)
                        {
                            $vote->percent = ($vote->result / $total)*100;
                        }
                    }
                    $item->votes = $v;
                break;
            }
        }
        Log::debug($items);
        return $items;
    }

    private function icons()
    {
        return [
            '',
            'thumb_up',
            'thumb_down',
            'tick',
            'cross',
            'sentiment_very_satisfied',
            'sentiment_satisfied',
            'sentiment_dissatisfied',
            'sentiment_very_dissatisfied',
        
        ];
    }

    private function colours()
    {
        return [
            'default',
            'success',
            'danger',
            'success',
            'danger',
            'success',
            'info',
            'warning',
            'danger',            
        ];
    }

    public function itemdefinition()
    {
        $items = SurveyItem::where('owner',$this->guid)->get();
        foreach($items as $item)
        {
            $icons = $this->icons();
            $colours = $this->colours();
            switch($item->type)
            {
                case 1:
                    $votes = explode(";",$item->options);
                    $v = array();
                    $index = 0;
                    foreach($votes as $vote)
                    {
                        $i = new \stdClass();
                        $i->icon = $icons[substr($vote,0,1)];
                        $i->colour = $colours[substr($vote,0,1)];
                        $i->text = substr($vote,1);
                        $i->index = $index++;
                        $v[]=$i;
                    }
                    $item->votes = $v;
                break;
                case 4:
                    if($item->options ?? "" == "") 
                    {
                        $item->steps = 5;
                        $item->minlabel = 'Poor';
                        $item->maxlabel = 'Excellent';
                    }
                    else
                    {
                        $options = explode(";",$item->options);
                    
                        $item->steps = $options[0];
                        $item->minlabel = $options[1];
                        $item->maxlabel = $options[2];
                    }
                break;
            }
        }
        return $items;
    }
}