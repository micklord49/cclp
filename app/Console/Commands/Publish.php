<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Carbon\Carbon;

use App\Blog;
use App\PublishEvent;


class Publish extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'publish:check';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Check for any news stories to publish';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        //
        $blogs = Blog::where('status','publishing')->where('publishNow',true)->get();
        foreach($blogs as $blog)    $this->publish($blog);
        $blogs = Blog::where('status','publishing')->where('publishNow',false)->where('publishFrom','<=',Carbon::now())->get();
        foreach($blogs as $blog)    $this->publish($blog);
    }

    private function publish(Blog $blog)
    {
        switch($blog->priority)
        {
            case 5:
                $this->socialNext($blog,0);
            break;
            case 9:
                $this->socialNext($blog,0);
                $this->socialNext($blog,1);
                $this->socialNext($blog,2);
            break;
        }
        $blog->status='published';
        $blog->publishedOn =Carbon::now();
        $blog->save();
    }


    private function socialNext($blog,$offset)
    {
        $now = Carbon::now();

        $slots = [
            Carbon::createFromTime(8,30,00),
            Carbon::createFromTime(11,30,00),
            Carbon::createFromTime(16,30,00),
        ];

        foreach($slots as $slot)
        {
            if($slot < $now)   $slot = $slot->addDays(1);
        }

        $curr = 2;
        if($now < $slots[1]) $curr = 1;
        if($now < $slots[0]) $curr = 0;

        $curr += $offset % 3;

        if($blog->totwitter)        $this->InsertEvent($blog,$slots[$curr],'twitter');
        if($blog->tofacebook)        $this->InsertEvent($blog,$slots[$curr],'facebook');        
    }

    private function InsertEvent(Blog $blog,Carbon $when,$dest)
    {
        PublishEvent::create(array(
            'guid' => uniqid("PEV"),
            'owner' => $blog->guid,
            'publishto' => $dest,
            'executeat' => $when,
            'status' => '',
            'executed' => 0
        ));
    }
}
