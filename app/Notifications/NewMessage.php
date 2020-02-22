<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

use App\Cclp;
use App\Branch;
use App\Campaign;


class NewMessage extends Notification
{
    use Queueable;
    public $guid;
    public $from;
    public $fromname;
    public $fromemail;

    public $to;
    public $subject;
    public $message;
    public $status;
    public $category;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($msg)
    {
        $this->guid = $msg->guid;
        $this->from = $msg->from;
        $this->fromname = $msg->fromname;
        $this->fromemail = $msg->fromemail;
        $this->to = $msg->to;
        $this->subject = $msg->subject;
        $this->message = $msg->message;
        $this->status = $msg->status;
        $this->category = $msg->category;

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

        switch(substr($this->to,0,3))
        {
            case "CLP":
                $cclp = Cclp::where('guid',$this->to)->firstOrFail();
                $fromname = $cclp->name;
                break;
            case "CMP":
                $campaign = Campaign::where('guid',$this->to)->firstOrFail();
                $fromname = $campaign->title;
                break;
            case "BRC":
                $branch = Branch::where('guid',$this->to)->firstOrFail();
                $fromname = $branch->name;
                break;
        }


        $subject = sprintf('%s: You\'ve got a new message from %s!', config('app.name'), $fromname);
        $greeting = sprintf('Hello,');
        $from = sprintf('A new message has been sent from %s.',$this->from);
 
        return (new MailMessage)
                    ->from('clp@maild.biz', 'CLP')
                    ->subject($subject)
                    ->greeting('Hello')
                    ->line($from)
                    ->line("Message is as follows:")
                    ->line($this->message)
                    ->line("")
                    ->salutation('Yours Faithfully')
                    ->action('Reply', 'mailto:'.$this->fromemail)
                    ->line('please log in and confirm the message has been dealt with!');
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
