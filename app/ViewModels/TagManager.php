<?php

namespace App\ViewModels;

use App\Tag;
use App\TagOwner;

class TagManager
{
    public static function owner($guid)
    {
        return new ITagOwner($guid);
    }

    public static function tag($guid)
    {
        return new ITagOwner($guid);
    }
}

class ITagOwner
{
    private $owner;

    public function __construct($owner)
    {
        $this->owner = $owner;
    }

    public function tags()
    {
        $tags = TagOwner::where("owner",$this->owner)->get();
        $c = array();
        foreach($tags as $tag)
        {
            $t = Tag::where("guid",$tag->tag)->firstOrFail();
            $new = new \stdClass();
            $new->key = $tag->guid;
            $new->guid = $tag->tag;
            $new->name = $t->name;

            array_push($c,$new);
        }
        return($c);
    }

    public function addtag($tag)
    {
        $tags = TagOwner::where("owner",$this->owner)->where("tag",$tag)->count();
        if($tags>0)  return;

        TagOwner::create(array(
            'guid' => uniqid("TGO"),
            'owner' => $this->owner,
            'tag' => $tag
        ));
    }

    public function removetag($tag)
    {
        TagOwner::where('tag',$tag)->where('owner',$this->owner)->delete();
    }
}

class ITagTag
{
    private $tag;

    public function __construct($tag)
    {
        $this->tag = $tag;
    }

    public function owners()
    {
        $tags = TagOwner::where("tag",$this->tag)->get();
        $c = array();
        foreach($tags as $tag)
        {
            $new = new \stdClass();
            $new->guid = $tag->tag;
            array_push($c,$new);
        }
        return($c);
    }

    public function addowner($owner)
    {
        $tags = TagOwner::where("owner",$owner)->where("tag",$this->tag)->count();
        if($tags>0)  return;

        TagOwner::create(array(
            'guid' => uniqid("TGO"),
            'owner' => $owner,
            'tag' => $this->tag
        ));
    }

    public function removeowner($owner)
    {
        TagOwner::where('tag',$this->tag)->where('owner',$owner)->delete();
    }

}
