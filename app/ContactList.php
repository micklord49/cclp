<?php

namespace App;
use Illuminate\Support\Facades\DB;


use Illuminate\Database\Eloquent\Model;

class ContactList extends Model
{
    //


    public function contacts()
    {

        return DB::table('list_contacts')->where('list',$this->guid)
            ->join('contacts', 'list_contacts.contact', '=', 'contacts.guid')
            ->select('contacts.*')
            ->get();

    }

    public function pagedcontacts($perpage,$page)
    {

        return DB::table('list_contacts')->where('list',$this->guid)
            ->join('contacts', 'list_contacts.contact', '=', 'contacts.guid')
            ->orderBy('created_at','DESC')->skip($perpage*($page-1))->take($perpage)
            ->select('contacts.*')
            ->get();

    }
}
