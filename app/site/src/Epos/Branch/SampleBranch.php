<?php

namespace Mothership\Site\Epos\Branch;

use Mothership\Site\Epos\UserGroup\SampleStaff;

use Message\User;
use Message\Mothership\Epos\Branch\BranchInterface;
use Message\Mothership\Commerce\Address\Address;

class SampleBranch implements BranchInterface
{
	public function getName()
	{
		return 'sample';
	}

	public function getDisplayName()
	{
		return 'Sample Branch';
	}

	public function getAddress()
	{
		$address = new Address;

		$address->setLines([
			'1 Example Street'
		]);

		$address->town      = 'Exampleton';
		$address->postcode  = 'EX41 7ON';
		$address->country   = 'United Kingdom';
		$address->countryID = 'GB';
		$address->telephone = '01234 567890';

		return $address;
	}

	public function getCurrency()
	{
		return 'GBP';
	}

	public function getOperators(User\Loader $loader)
	{
		return $loader->getByGroup(SampleStaff::NAME);
	}

	public function getTills()
	{
		return [1];
	}

	public function getSellStockLocation()
	{
		return 'web';
	}
}