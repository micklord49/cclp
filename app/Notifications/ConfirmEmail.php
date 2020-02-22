<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

use App\Cclp;
use App\Branch;
use App\Campaign;



class ConfirmEmail extends Notification
{
    use Queueable;


    private $owner;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($owner)
    {
        //
        $this->owner = $owner;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        $fromname = "";

        switch(substr($this->owner,0,3))
        {
            case "CLP":
                $cclp = Cclp::where('guid',$notifiable->clp)->firstOrFail();
                $fromname = $cclp->name;
                break;
            case "CMP":
                $campaign = Campaign::where('guid',$this->owner)->firstOrFail();
                $fromname = $campaign->title;
                break;
            case "BRC":
                $branch = Branch::where('guid',$this->owner)->firstOrFail();
                $fromname = $branch->name.' branch.';
                break;
        }


        $subject = sprintf('You recently sent a message to %s.', $fromname);
        $greeting = sprintf('Hello,');

        $confirm = '/contacts/'.$notifiable->guid.'/verify';
 
        return (new MailMessage)
                    ->from('clp@maild.biz', 'CLP')
                    ->subject('Please confirm your email address.')
                    ->greeting('Hello')
                    ->line($subject)
                    ->line("would you please confirm your email address.")
                    ->salutation('Yours Faithfully')
                    ->action('Confirm Email Address', url($confirm));
        
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            //
        ];
    }
}
