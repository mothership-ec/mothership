<?php

namespace Mothership\Site\ShippingMethod;

use Message\Mothership\Commerce\Shipping\MethodInterface;
use Message\Mothership\Commerce\Order\Order;

class Uk implements MethodInterface
{
	public function getName()
	{
		return 'uk';
	}

	public function getDisplayName()
	{
		return 'UK';
	}

	public function isAvailable(Order $order)
	{
		return true;
	}

	public function getPrice()
	{
		return 6;
	}
}