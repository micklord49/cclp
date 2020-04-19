<?php

namespace App\ViewModels\Managers;

use App\ContactList;

class ListsManager
{
    public static function owner($guid)
    {
        return new IListsOwner($guid);
    }
}

class IListsOwner
{
    private $owner;

    public function __construct($owner)
    {
        $this->owner = $owner;
    }

    public function AddLists(&$obj)
    {
        $subscriptionlists = ContactList::where('owner',$this->owner)->where('type',1)->get();
        $select = array();
        foreach($subscriptionlists as $list)
        {
            $l = new \stdClass();
            $l->value = $list->guid;
            $l->display = $list->title;
            array_push($select,$l);
        }
        $obj->subscriptionlists = $select;

        $actionlists = ContactList::where('owner',$this->owner)->where('type','>',1)->get();
        $select = array();
        foreach($actionlists as $list)
        {
            $l = new \stdClass();
            $l->value = $list->guid;
            $l->display = $list->title;
            array_push($select,$l);
        }
        $obj->actionlists = $select;

    }
}