<?php

class App extends \Message\Cog\Application\Loader
{
	protected function _registerModules()
	{

		return [
			'Message\\ImageResize',
			'Message\\User',
			'Message\\Mothership\\User',
			'Message\\Mothership\\ControlPanel',
			'Message\\Mothership\\FileManager',
			'Message\\Mothership\\CMS',
			'Message\\Mothership\\Commerce',
			'Message\\Mothership\\Ecommerce',
			'Message\\Mothership\\OrderReturn',
			'Message\\Mothership\\Voucher',
			'Message\\Mothership\\Discount',
			'Message\\Mothership\\Report',
			'Mothership\\Site',
		];
	}
}