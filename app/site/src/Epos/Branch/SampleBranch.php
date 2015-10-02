<?php

namespace Mothership\Site\Epos\Branch;

use Mothership\Site\Epos\UserGroup\ShopStaff;

use Message\User;
use Message\Mothership\Epos\Branch\BranchInterface;
use Message\Mothership\Commerce\Address\Address;

/**
 * Class SampleBranch
 * @package Mothership\Site\Epos\Branch
 *
 * @author  Thomas Marchant <thomas@mothership.ec>
 *
 * Example class representing a Branch which uses the Mothership EPOS system. This class is not
 * intended to be used as is. Please edit or replace this class if you want to use the EPOS system
 * in a live environment.
 *
 * Note: This class is called in the Bootstrap\Services class under the 'branches' service. Be sure
 * add any new branch classes there. If you rename this class, you will need to rename it there too.
 */
class SampleBranch implements BranchInterface
{
	/**
	 * Return the name of the branch. This will be used in the URL when accessing the
	 * EPOS system, so should work as a valid URL (ideally a string made up of lower case letters,
	 * numbers and hyphens).
	 *
	 * {@inheritDoc}
	 */
	public function getName()
	{
		return 'sample';
	}

	/**
	 * Name of the branch as it will appear on the till screen.
	 *
	 * {@inheritDoc}
	 */
	public function getDisplayName()
	{
		return 'Sample Branch';
	}

	/**
	 * Return the address of the branch. The most important part is the `countryID` property as
	 * this is used when calculating the tax on sold items.
	 *
	 * {@inheritDoc}
	 */
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

	/**
	 * Get the currency code in which till transactions are carried out in.
	 *
	 * {@inheritDoc}
	 */
	public function getCurrency()
	{
		return 'GBP';
	}

	/**
	 * Get an array of users who have access to the till. Their names will appear on the main
	 * till login screen.
	 *
	 * {@inheritDoc}
	 */
	public function getOperators(User\Loader $loader)
	{
		return $loader->getByGroup(ShopStaff::NAME);
	}

	/**
	 * Get an array of all the tills for the shop. It is recommended that these tills are
	 * represented as integers, but they can be strings as well.
	 *
	 * {@inheritDoc}
	 */
	public function getTills()
	{
		return [1];
	}

	/**
	 * Get the location to sell items from. If the stock for the website and the shop are coming
	 * from the same place, this should return 'web'. However, if there is more than one
	 * branch, or the web stock is sold from a warehouse, this should return the name of the
	 * location from which the stock for this branch will be sold. It can also return an instance
	 * of \Message\Mothership\Commerce\Product\Stock\Location\Location if you are feeling fancy
	 *
	 * {@inheritDoc}
	 */
	public function getSellStockLocation()
	{
		return 'web';
	}
}