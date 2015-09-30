<?php

namespace Mothership\Site\Epos\UserGroup;

use Message\User\Group\GroupInterface;
use Message\User\Group\Permissions;

/**
 * Class SampleStaff
 * @package Mothership\Site\Epos\UserGroup
 *
 * @author  Thomas Marchant <thomas@mothership.ec>
 *
 * User group for staff members at the shop. Add users to this group via the 'Groups' tab
 * when editing a user in the admin panel. This will cause their name to come up on the
 * login screen for the EPOS system.
 */
class ShopStaff implements GroupInterface
{
	const NAME = 'shop-staff';

	/**
	 * Returns the name of the group as it is will be identified in the database.
	 *
	 * {@inheritDoc}
	 */
	public function getName()
	{
		return self::NAME;
	}

	/**
	 * Returns the name for the group as it will appear in the admin panel.
	 *
	 * {@inheritDoc}
	 */
	public function getDisplayName()
	{
		return 'Shop staff';
	}

	/**
	 * Returns a description for the group.
	 *
	 * {@inheritDoc}
	 */
	public function getDescription()
	{
		return 'Shop staff that have access to the EPOS system';
	}

	/**
	 * Set which sections of the system members of this group can access. If this method is
	 * left empty, users in this group will be able to access anywhere on the site. It is currently
	 * set up to allow users in this group access to the EPOS system only.
	 *
	 * {@inheritDoc}
	 */
	public function registerPermissions(Permissions $permissions)
	{
		$permissions->addRoute('ms.epos.index');
	}
}