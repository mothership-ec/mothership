<?php

namespace Mothership\Site\Epos\UserGroup;

use Message\User\Group\GroupInterface;
use Message\User\Group\Permissions;

class SampleStaff implements GroupInterface
{
	const NAME = 'sample-staff';

	public function getName()
	{
		return self::NAME;
	}

	public function getDisplayName()
	{
		return 'Shop staff';
	}

	public function getDescription()
	{
		return 'Shop staff that have access to the EPOS system';
	}

	public function registerPermissions(Permissions $permissions)
	{

	}
}