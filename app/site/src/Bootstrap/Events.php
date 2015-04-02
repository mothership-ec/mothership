<?php

namespace Mothership\Site\Bootstrap;

use Mothership\Site\EventListener;
use Message\Cog\Bootstrap\EventsInterface;

class Events implements EventsInterface
{
	public function registerEvents($dispatcher)
	{
		$dispatcher->addSubscriber(new EventListener\Frontend);
	}
}