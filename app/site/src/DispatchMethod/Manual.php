<?php

namespace Mothership\Site\DispatchMethod;

use Message\Mothership\Commerce\Order\Entity\Dispatch\MethodInterface;

class Manual implements MethodInterface
{
	/**
	 * {@inheritDoc}
	 */
	public function getName()
	{
		return 'manual';
	}

	/**
	 * {@inheritDoc}
	 */
	public function getDisplayName()
	{
		return 'Manual dispatch';
	}

	/**
	 * {@inheritDoc}
	 */
	public function getTrackingLink($code)
	{
		return false;
	}

	/**
	 * {@inheritDoc}
	 */
	public function allowAutomaticPostage()
	{
		return false;
	}
}