<?php

namespace App;
use Illuminate\Notifications\Notifiable;


use Illuminate\Database\Eloquent\Model;

use App\BranchAdministrator;

class Branch extends Model
{
    use Notifiable;

    protected $fillable = [
        'clp', 'guid', 'name'
    ];

    //
    protected $attributes = [
        'ecofficer' => '',
        'email' => '',
     ];

     public function routeNotificationForMail($notification)
     {
         $emailaddress = array();
 
         $branchusers = BranchAdministrator::where('branch',$this->guid)->get();
         foreach($branchusers as $branchuser)
         {
             $users = User::where('guid',$branchuser->user)->get();
             foreach($users as $user)
             {
                 if($user->email != "")
                 {
                     //if($emailaddress!="")   $emailaddress .= ";";
                     array_push($emailaddress,$user->email);
                 }
             }
         }
         return $emailaddress;
     }
 

}
